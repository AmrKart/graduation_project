import React, {
    useRef,
    useEffect,
    useCallback,
    forwardRef,
    useImperativeHandle
} from "react";
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import 'datatables.net-bs5';
import DataTable from 'datatables.net-react';
import DT from 'datatables.net-bs5';
import i18n from "@@/i18n";
import { translate } from "@@/locales/translate";
// import type { Api } from "datatables.net";

DataTable.use(DT);

interface DataTableContainerProps {
    columns?: any[];
    ajax?: {
        url: string;
        method?: string;
        data?: any;
    };
    serverSide?: boolean;
    rowId?: string;
    actions?: {
        enabled: boolean;
        renderHtml?: ((row: any) => string) | null;
    };
    filters?: any[];
    onRowClick?: (row: any) => void;
    onEdit?: (row: any, id: any) => void;
    onView?: (row: any, id: any) => void;
    onDelete?: (row: any, id: any) => void;
    reloadTrigger?: any;
    options?: any;
}

export type DataTableRef = {
    refetch: () => void;
    getApi?: () => any;
};

const DataTableContainer = forwardRef<DataTableRef, DataTableContainerProps>(
    (props, ref) => {
        const {
            columns = [],
            ajax,
            serverSide = true,
            rowId = "id",
            actions = { enabled: false, renderHtml: null },
            filters = [],
            onRowClick,
            onEdit,
            onView,
            onDelete,
            reloadTrigger,
            options = {}
        } = props;

        const tableApiRef = useRef<any>(null);
        const tableRef = useRef<any>(null);
        const containerRef = useRef<HTMLElement | null>(null);
        const handlerRef = useRef<((e: Event) => void) | null>(null);

        // Store callbacks in refs so they persist across re-renders
        const callbacksRef = useRef({
            onView,
            onEdit,
            onDelete,
            onRowClick
        });

        // Update callbacks ref when props change
        useEffect(() => {
            callbacksRef.current = {
                onView,
                onEdit,
                onDelete,
                onRowClick
            };
        }, [onView, onEdit, onDelete, onRowClick]);

        const [loading, setLoading] = React.useState(false);

        // Build columns with actions placeholder if needed
        const isRtl = i18n.language === "ar";
        const builtColumns = React.useMemo(() => {
            const cols = columns.map((col: any) => ({
                ...col,
                className: col.className || (isRtl ? "text-start" : "text-end")
            }));

            if (actions && actions.enabled) {
                cols.push({
                    title: translate("table.actions"),
                    data: null,
                    orderable: false,
                    searchable: false,
                    className: isRtl ? "text-start" : "text-end",
                    render: (_data: any, _type: any, row: any) => {
                        if (typeof actions.renderHtml === "function") {
                            return actions.renderHtml(row);
                        }
                        return `
                        <div style="display:flex; gap:10px; align-items:center; justify-content:center;">
                            ${callbacksRef.current.onView ? `<button type="button" class="btn btn-info dt-btn dt-view" data-id="${row[rowId]}" data-row-id="${row[rowId]}"><i class="bx bx-show" style="font-size:1.3rem"></i></button>` : ''}
                            ${callbacksRef.current.onDelete ? `<button type="button" class="btn btn-danger dt-btn dt-delete" data-id="${row[rowId]}" data-row-id="${row[rowId]}"><i class="bx bx-trash" style="font-size:1.3rem"></i></button>` : ''}
                            ${callbacksRef.current.onEdit ? `<button type="button" class="btn btn-primary dt-btn dt-edit" data-id="${row[rowId]}" data-row-id="${row[rowId]}"><i class="bx bx-edit" style="font-size:1.3rem"></i></button>` : ''}
                        </div>
                    `;
                    }
                });
            }
            return cols;
        }, [columns, actions, rowId, isRtl]);


        const tryReload = (api: any) => {
            try {
                if (!api) return false;

                // 1) the common DataTables API: api.ajax.reload(...)
                if (api.ajax && typeof api.ajax.reload === 'function') {
                    api.ajax.reload(null, false);
                    return true;
                }

                // 2) some wrappers expose ajax as a function that returns an object with reload
                if (typeof api.ajax === 'function') {
                    const a = api.ajax();
                    if (a && typeof a.reload === 'function') {
                        a.reload(null, false);
                        return true;
                    }
                }

                // 3) If api.table exists, use the node and try to get jQuery DataTable
                if (typeof api.table === 'function') {
                    const node = api.table().node?.();
                    if (node && (window as any).jQuery) {
                        const $ = (window as any).jQuery;
                        const jqTable = $.fn.dataTable && $(node).dataTable ? $(node).DataTable?.() : null;
                        if (jqTable && jqTable.ajax && typeof jqTable.ajax.reload === 'function') {
                            jqTable.ajax.reload(null, false);
                            return true;
                        }
                    }
                }

                // 4) finally try the component ref (tableRef.current.dt)
                if (tableRef.current?.dt && tableRef.current.dt.ajax && typeof tableRef.current.dt.ajax.reload === 'function') {
                    tableRef.current.dt.ajax.reload(null, false);
                    return true;
                }
            } catch (err) {
                // swallow but log for debugging
                // eslint-disable-next-line no-console
                console.warn('tryReload failed', err);
            }
            return false;
        };

        // Cleanup event listener on unmount
        useEffect(() => {
            return () => {
                if (containerRef.current && handlerRef.current) {
                    containerRef.current.removeEventListener("click", handlerRef.current);
                }
            };
        }, []);

        useEffect(() => {
            if (reloadTrigger === undefined || reloadTrigger === false) return;
            tryReload(tableApiRef.current);
        }, [reloadTrigger]);

        // Create event handler function
        const createEventHandler = useCallback((dtApi: any) => {
            return (e: Event) => {
                const target = e.target as HTMLElement;
                const btn = target.closest(".dt-btn") as HTMLElement;

                if (!btn) {
                    // Check if row click is enabled
                    const tr = target.closest("tr");
                    if (tr && callbacksRef.current.onRowClick && !target.closest(".dt-btn")) {
                        try {
                            const rowData = dtApi.row(tr).data();
                            if (rowData) {
                                callbacksRef.current.onRowClick?.(rowData);
                            }
                        } catch (err) {
                            // Ignore errors
                        }
                    }
                    return;
                }

                e.preventDefault();
                e.stopPropagation();

                const tr = btn.closest("tr");
                if (!tr) return;

                // Get row data using DataTables API
                let rowData = null;
                let idValue = null;

                try {
                    if (dtApi && typeof dtApi.row === 'function') {
                        const row = dtApi.row(tr);
                        rowData = row.data();
                        idValue = rowData ? rowData[rowId] : null;
                    }
                } catch (err) {
                    // Fallback to data attribute
                    idValue = btn.getAttribute('data-id') || btn.getAttribute('data-row-id');
                    if (idValue) {
                        rowData = { [rowId]: idValue };
                    }
                }

                // Fallback if rowData is still null
                if (!idValue) {
                    idValue = btn.getAttribute('data-id') || btn.getAttribute('data-row-id');
                }

                // Call appropriate callback
                if (btn.classList.contains("dt-view")) {
                    callbacksRef.current.onView?.(rowData, idValue);
                } else if (btn.classList.contains("dt-edit")) {
                    callbacksRef.current.onEdit?.(rowData, idValue);
                } else if (btn.classList.contains("dt-delete")) {
                    callbacksRef.current.onDelete?.(rowData, idValue);
                }
            };
        }, [rowId]);

        // Attach event listeners
        const attachEventListeners = useCallback((dtApi: any) => {
            if (!dtApi) return;

            let container: HTMLElement | null = null;
            try {
                if (typeof dtApi.table === 'function') {
                    container = dtApi.table().container() as HTMLElement;
                } else if (tableRef.current) {
                    container = tableRef.current.querySelector('.dataTables_wrapper') as HTMLElement;
                }
            } catch (err) {
                if (tableRef.current) {
                    container = tableRef.current.querySelector('.dataTables_wrapper') as HTMLElement;
                }
            }

            if (!container) return;

            // Remove old listener if exists
            if (containerRef.current && handlerRef.current) {
                containerRef.current.removeEventListener("click", handlerRef.current);
            }

            // Create and attach new listener
            containerRef.current = container;
            handlerRef.current = createEventHandler(dtApi);
            container.addEventListener("click", handlerRef.current, true); // Use capture phase
        }, [createEventHandler]);

        // Merge options
        const dtOptions = {
            serverSide,
            ajax: {
                url: ajax?.url,
                method: ajax?.method || "GET",
                headers: {
                    Authorization: 'Bearer ' + JSON.parse(localStorage.getItem("authUser") || '{}').access_token,
                },
                beforeSend: () => {
                    setLoading(true);
                },
                complete: () => {
                    setLoading(false);
                },
                error: () => {
                    setLoading(false);
                },
            },
            processing: serverSide,
            columns: builtColumns,
            rowId,
            language: {
                lengthMenu: "_MENU_",
                paginate: {
                    previous: i18n.language === "ar" ? "السابق" : "Previous",
                    next: i18n.language === "ar" ? "التالي" : "Next"
                },
                info: i18n.language === "ar"
                    ? "عرض _START_ إلى _END_ من أصل _TOTAL_ سجل"
                    : "Showing _START_ to _END_ of _TOTAL_ entries",
                processing: "",
            },
            dom: '<"row"<"col-sm-12 col-md-6"l><"col-sm-12 col-md-6"f>>rtip',
            initComplete: function () {
                const api = this.api?.();
                try {
                    const container = api?.table?.().container?.();
                    if (!container) return;

                    const tableNode = api.table().node();
                    if (tableNode && tableNode instanceof HTMLTableElement) {
                        tableNode.classList.add('table', 'table-striped', 'table-bordered', 'table-hover');
                    }

                    const lengthDiv = container.querySelector('.dt-length');
                    if (lengthDiv) {
                        if (i18n.language === 'ar') {
                            lengthDiv.classList.add('d-flex', 'justify-content-start', 'mb-3');
                        } else {
                            lengthDiv.classList.add('d-flex', 'justify-content-end', 'mb-3');
                        }
                        const select = lengthDiv.querySelector('select');
                        const label = lengthDiv.querySelector('label');
                        if (select) {
                            select.classList.add('form-select', 'form-select-lg', 'bg-primary', 'text-white');
                            (select as HTMLElement).style.width = '120px';
                        }
                        if (label) {
                            label.classList.add('me-2', 'fw-semibold');
                            if (i18n.language === 'ar') {
                                lengthDiv.classList.add('text-end');
                            }
                        }
                    }
                } catch (error) {
                    console.warn('initComplete fallback', error);
                }
            },
            drawCallback: function () {
                const api = this.api?.();
                if (api) {
                    // Re-attach event listeners after each draw
                    attachEventListeners(api);
                }
            },
            preDrawCallback: function () {
                try {
                    const api = this.api?.();
                    if (!api) return;

                    const container = api.table?.().container?.();
                    if (!container) return;

                    const proc = container.querySelector('.dataTables_processing, .dt-processing');
                    const proc2 = container.querySelector('.flag');
                    if (proc) {
                        proc.classList.remove('card', 'dt-processing');
                        proc.classList.add('d-flex', 'justify-content-center', 'align-items-center', 'flag');
                        (proc as HTMLElement).style.height = 'auto';
                        proc.innerHTML = `<div class="spinner-border text-info m-5" role="status">
                                    <span class="visually-hidden">Loading...</span>
                                  </div>`;
                    }
                    if (proc2) {
                        if (proc2.classList.contains('d-flex')) {
                            proc2.classList.remove('d-flex');
                            proc2.classList.add('d-none');
                        }
                        else if (proc2.classList.contains('d-none')) {
                            proc2.classList.remove('d-none');
                            proc2.classList.add('d-flex');
                        }
                    }

                    const rowBefore = container.querySelector('.row');
                    const rowAfter = container.querySelector('.rowFlag');
                    const tableStripedBefore = container.querySelector('.dataTable');
                    const tableStripedAfter = container.querySelector('.tableFlag');

                    if (rowBefore) {
                        rowBefore.classList.add('d-none', 'rowFlag');
                    }
                    if (tableStripedBefore) {
                        tableStripedBefore.classList.add('d-none', 'tableFlag');
                    }
                    if (rowAfter) {
                        rowAfter.classList.remove('d-none');
                    }
                    if (tableStripedAfter) {
                        tableStripedAfter.classList.remove('d-none');
                    }
                } catch (error) {
                    console.warn('preDrawCallback fallback', error);
                }
            },
            ...options
        };

        const pendingReloadRef = useRef(false);
        // Expose API methods via ref
        useImperativeHandle(ref, () => ({
            refetch() {
                if (!tryReload(tableApiRef.current)) {
                    pendingReloadRef.current = true;
                }
            },
            getApi: () => tableApiRef.current,
        }));

        return (
            <div className="datatable-wrapper">
                <DataTable
                    ref={tableRef}
                    options={dtOptions}
                    onInit={(api: any) => {
                        let dtApi = api;
                        try {
                            // if wrapper exposes .api() use it
                            if (api && typeof api.api === 'function') {
                                dtApi = api.api();
                            } else if (!api && tableRef.current?.dt) {
                                dtApi = tableRef.current.dt;
                            } else if (api && typeof api.table === 'function') {
                                // keep api as-is
                                dtApi = api;
                            }
                        } catch (err) {
                            dtApi = tableRef.current?.dt || api;
                        }

                        tableApiRef.current = dtApi;

                        // Flush queued reloads (robustly)
                        if (pendingReloadRef.current) {
                            if (!tryReload(dtApi)) {
                                // still not ready — keep queued (optional: could retry with timeout)
                                // we'll leave pendingReloadRef true so next init/draw can try again
                                // eslint-disable-next-line no-console
                                console.warn('Pending reload could not be flushed on init; kept queued.');
                            } else {
                                pendingReloadRef.current = false;
                            }
                        }

                        // existing attachEventListeners call...
                        attachEventListeners(dtApi);

                        // register destroy cleanup as before...
                        try {
                            if (dtApi && typeof dtApi.on === 'function') {
                                dtApi.on("destroy", () => {
                                    if (containerRef.current && handlerRef.current) {
                                        containerRef.current.removeEventListener("click", handlerRef.current);
                                    }
                                });
                            }
                        } catch (err) {
                            console.warn('onInit cleanup registration failed', err);
                        }
                    }}
                />
            </div>
        );
    });

DataTableContainer.displayName = 'DataTableContainer';

export default DataTableContainer;
