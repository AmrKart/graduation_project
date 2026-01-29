import React from "react";
import { CardBody, Card } from "reactstrap";



const CardInfo = (props) => {


    return (
        <React.Fragment>
            {/* <Card className="mini-stats-wid rounded-2"> */}
            <Card className="mini-stats-wid" style={props?.style ?? {}}>
                <CardBody>
                    <div className="d-flex">
                        <div className="flex-grow-1">

                            <p className="mb-2" style={{ fontWeight: "bold" }}>{props.title}</p>
                            <p className="text-muted fw-medium mb-0">
                                {props.description}
                            </p>

                        </div>
                        {!props.src && <div className="avatar-sm rounded-circle bg-primary align-self-center mini-stat-icon">
                            <span className="avatar-title rounded-circle bg-primary">
                                <i
                                    className={
                                        props.icon + " font-size-22"
                                    }
                                ></i>
                            </span>
                        </div>}
                        {props.src && <div style={{ backgroundColor: "#D5E1F2", width: "40px", height: "40px" }} className=" d-flex rounded-3 align-items-center justify-content-center ">
                            <img width={30} src={props.src} alt="" />
                        </div>}
                    </div>
                </CardBody>
            </Card>
        </React.Fragment >
    )
}
export default CardInfo;