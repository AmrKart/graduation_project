import React, { useEffect, useMemo, useState } from 'react';
import { Container, Row, Col, Card, CardBody } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@@/store';
import {
  getActivityChartsStatistics,
  getCarStatistics,
  getCommunityStatistics,
  getDashboardStatistics,
  getEngagementStatistics,
  getUserStatistics,
} from '@@/store/actions';
import { translate } from '@@/locales/translate';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
} from 'recharts';

type SimpleChartPoint = {
  date: string;
  count: number;
};

type ActivityChartPoint = {
  date: string;
  reviews: number;
  questions: number;
  registrations: number;
};

const formatDateLabel = (value: string) => {
  try {
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return `${d.getMonth() + 1}/${d.getDate()}`;
  } catch {
    return value;
  }
};

const PRIMARY_COLOR = '#1a1f2e';
const SUCCESS_COLOR = '#34c38f';
const WARNING_COLOR = '#f1b44c';
const INFO_COLOR = '#06b6d4';

const SimpleLineChart: React.FC<{
  data: SimpleChartPoint[];
  color?: string;
}> = ({ data, color = PRIMARY_COLOR }) => {
  if (!data || data.length === 0)
    return (
      <span className="text-muted">{translate('no.data') || 'No data'}</span>
    );

  return (
    <div className="statistics-chart-wrapper">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tickFormatter={formatDateLabel}
            tick={{ fill: '#adb5bd', fontSize: 11 }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: '#adb5bd', fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2535',
              border: 'none',
              borderRadius: 8,
            }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke={SUCCESS_COLOR}
            strokeWidth={2.2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const ActivityMultiLineChart: React.FC<{ data: ActivityChartPoint[] }> = ({
  data,
}) => {
  if (!data || data.length === 0)
    return (
      <span className="text-muted">{translate('no.data') || 'No data'}</span>
    );

  return (
    <div className="statistics-chart-wrapper statistics-chart-wrapper-lg">
      <ResponsiveContainer>
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            tickFormatter={formatDateLabel}
            tick={{ fill: '#adb5bd', fontSize: 11 }}
          />
          <YAxis
            allowDecimals={false}
            tick={{ fill: '#adb5bd', fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2535',
              border: 'none',
              borderRadius: 8,
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="reviews"
            name={translate('reviews') || 'Reviews'}
            stroke={SUCCESS_COLOR}
            strokeWidth={2.2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="questions"
            name={translate('questions') || 'Questions'}
            stroke={WARNING_COLOR}
            strokeWidth={2.2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="registrations"
            name={translate('registrations') || 'Registrations'}
            stroke={INFO_COLOR}
            strokeWidth={2.2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

const HorizontalBarChart: React.FC<{
  data: any[];
  valueKey: string;
  labelKey: string;
}> = ({ data, valueKey, labelKey }) => {
  if (!data || data.length === 0)
    return (
      <span className="text-muted">{translate('no.data') || 'No data'}</span>
    );

  // keep only first 10 items to avoid clutter
  const sliced = data.slice(0, 10);

  const MAX_LABEL_LENGTH = 18;
  const normalized = sliced.map((item) => {
    const raw = item[labelKey];
    const text = typeof raw === 'string' ? raw : String(raw ?? '');
    const display =
      text.length > MAX_LABEL_LENGTH
        ? `${text.slice(0, MAX_LABEL_LENGTH - 10)}...`
        : text;
    return {
      ...item,
      _displayLabel: display,
      _fullLabel: text,
    };
  });

  // increase height based on number of items to avoid label overlap
  const containerHeight = Math.max(300, normalized.length * 34);

  return (
    <div
      className="statistics-chart-wrapper statistics-chart-wrapper-lg"
      style={{ height: containerHeight }}
    >
      <ResponsiveContainer>
        <BarChart data={normalized} layout="vertical" margin={{ left: 80 }}>
          <XAxis type="number" tick={{ fill: '#adb5bd', fontSize: 11 }} />
          <YAxis
            type="category"
            dataKey="_displayLabel"
            width={10}
            tick={{ fontSize: 12, fill: '#adb5bd' }}
            tickMargin={50}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2535',
              border: 'none',
              borderRadius: 8,
            }}
            labelFormatter={(_, payload) => {
              const p = payload && payload[0];
              const full = p?.payload?._fullLabel;
              const display = p?.payload?._displayLabel;
              return full || display || '';
            }}
          />{' '}
          <Bar dataKey={valueKey} fill={SUCCESS_COLOR} radius={[4, 4, 4, 4]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

const StatisticsPage: React.FC = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'users' | 'cars' | 'community' | 'engagement' | 'activity'
  >('overview');

  const { dashboard, users, cars, community, engagement, activityCharts } =
    useSelector((state: RootState) => state.Statisticses);

  useEffect(() => {
    dispatch(getDashboardStatistics());
    dispatch(getUserStatistics());
    dispatch(getCarStatistics());
    dispatch(getCommunityStatistics());
    dispatch(getEngagementStatistics());
    dispatch(getActivityChartsStatistics());
  }, [dispatch]);

  const userChartData: SimpleChartPoint[] = useMemo(
    () => users?.data?.chart || [],
    [users?.data]
  );

  const carChartData: SimpleChartPoint[] = useMemo(
    () => cars?.data?.chart || [],
    [cars?.data]
  );

  const communityReviewsChartData: SimpleChartPoint[] = useMemo(
    () => community?.data?.charts?.reviews || [],
    [community?.data]
  );

  const communityQuestionsChartData: SimpleChartPoint[] = useMemo(
    () => community?.data?.charts?.questions || [],
    [community?.data]
  );

  const activityChartData: ActivityChartPoint[] = useMemo(
    () => activityCharts?.data || [],
    [activityCharts?.data]
  );

  const isAnyLoading =
    dashboard.loading ||
    users.loading ||
    cars.loading ||
    community.loading ||
    engagement.loading ||
    activityCharts.loading;

  const renderOverviewTab = () => (
    <>
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="statistics-kpi-card">
            <CardBody>
              <p className="statistics-kpi-label mb-2">
                {translate('users') || 'Users'}
              </p>
              <h3 className="statistics-kpi-value mb-2">
                {dashboard?.data?.users?.total ?? '-'}
              </h3>
              <p className="mb-0 statistics-kpi-label">
                {translate('new.today') || 'New today'}:{' '}
                <span className="statistics-kpi-meta">
                  {dashboard?.data?.users?.new_today ?? '-'}
                </span>
              </p>
              <p className="mb-0 statistics-kpi-label">
                {translate('new.this.month') || 'New this month'}:{' '}
                <span className="statistics-kpi-meta">
                  {dashboard?.data?.users?.new_this_month ?? '-'}
                </span>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="statistics-kpi-card">
            <CardBody>
              <p className="statistics-kpi-label mb-2">
                {translate('cars') || 'Cars'}
              </p>
              <h3 className="statistics-kpi-value mb-2">
                {dashboard?.data?.cars?.total_trims ?? '-'}
              </h3>
              <p className="mb-0 statistics-kpi-label">
                {translate('car.makes') || 'Makes'}:{' '}
                <span className="statistics-kpi-meta">
                  {dashboard?.data?.cars?.total_makes ?? '-'}
                </span>
              </p>
              <p className="mb-0 statistics-kpi-label">
                {translate('car.models') || 'Models'}:{' '}
                <span className="statistics-kpi-meta">
                  {dashboard?.data?.cars?.total_models ?? '-'}
                </span>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="statistics-kpi-card">
            <CardBody>
              <p className="statistics-kpi-label mb-2">
                {translate('community') || 'Community'}
              </p>
              <h3 className="statistics-kpi-value mb-2">
                {dashboard?.data?.community?.reviews?.total ?? '-'}
              </h3>
              <p className="mb-0 statistics-kpi-label">
                {translate('questions') || 'Questions'}:{' '}
                <span className="statistics-kpi-meta">
                  {dashboard?.data?.community?.questions?.total ?? '-'}
                </span>
              </p>
              <p className="mb-0 statistics-kpi-label">
                {translate('answers') || 'Answers'}:{' '}
                <span className="statistics-kpi-meta">
                  {dashboard?.data?.community?.answers?.total ?? '-'}
                </span>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col lg={3} md={6} className="mb-3">
          <Card className="statistics-kpi-card">
            <CardBody>
              <p className="statistics-kpi-label mb-2">
                {translate('engagement') || 'Engagement'}
              </p>
              <h3 className="statistics-kpi-value mb-2">
                {engagement?.data?.top_10_most_active_reviewers
                  ? engagement.data.top_10_most_active_reviewers.length
                  : '-'}
              </h3>
              <p className="mb-0 statistics-kpi-label">
                {translate('top.rated.trims') || 'Top rated trims'}:{' '}
                <span className="statistics-kpi-meta">
                  {engagement?.data?.top_10_rated_trims?.length ?? '-'}
                </span>
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col lg={6} className="mb-4">
          <Card className="statistics-chart-card">
            <CardBody>
              <h5 className="statistics-card-title mb-3">
                {translate('activity.overview') || 'Activity overview'}
              </h5>
              <ActivityMultiLineChart data={activityChartData} />
            </CardBody>
          </Card>
        </Col>
        <Col lg={6} className="mb-4">
          <Card className="statistics-chart-card">
            <CardBody>
              <h5 className="statistics-card-title mb-3">
                {translate('users.growth') || 'Users growth'}
              </h5>
              <SimpleLineChart data={userChartData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );

  const renderUsersTab = () => (
    <>
      <Row className="mb-4">
        <Col lg={3} md={6} className="mb-3">
          <Card className="statistics-kpi-card">
            <CardBody>
              <p className="statistics-kpi-label mb-2">
                {translate('users') || 'Users'}
              </p>
              <h3 className="statistics-kpi-value mb-2">
                {users?.data?.total ?? '-'}
              </h3>
              <p className="mb-0 statistics-kpi-label">
                {translate('new.today') || 'New today'}:{' '}
                <span className="statistics-kpi-meta">
                  {users?.data?.new_today ?? '-'}
                </span>
              </p>
              <p className="mb-0 statistics-kpi-label">
                {translate('new.this.month') || 'New this month'}:{' '}
                <span className="statistics-kpi-meta">
                  {users?.data?.new_this_month ?? '-'}
                </span>
              </p>
              <p className="mb-0 statistics-kpi-label">
                {translate('active.last.7.days') || 'Active last 7 days'}:{' '}
                <span className="statistics-kpi-meta">
                  {users?.data?.active_last_7_days ?? '-'}
                </span>
              </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={12}>
          <Card className="statistics-chart-card">
            <CardBody>
              <h5 className="statistics-card-title mb-3">
                {translate('users.registrations.chart') ||
                  'Users registrations chart'}
              </h5>
              <SimpleLineChart data={userChartData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );

  const renderCarsTab = () => {
    const trimsByBodyType = cars?.data?.trims_by_body_type || [];
    return (
      <>
        <Row className="mb-4">
          <Col lg={3} md={6} className="mb-3">
            <Card className="statistics-kpi-card">
              <CardBody>
                <p className="statistics-kpi-label mb-2">
                  {translate('car.makes') || 'Makes'}
                </p>
                <h3 className="statistics-kpi-value mb-1">
                  {cars?.data?.total_makes ?? '-'}
                </h3>
              </CardBody>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="statistics-kpi-card">
              <CardBody>
                <p className="statistics-kpi-label mb-2">
                  {translate('car.models') || 'Models'}
                </p>
                <h3 className="statistics-kpi-value mb-1">
                  {cars?.data?.total_models ?? '-'}
                </h3>
              </CardBody>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="statistics-kpi-card">
              <CardBody>
                <p className="statistics-kpi-label mb-2">
                  {translate('car.trims') || 'Trims'}
                </p>
                <h3 className="statistics-kpi-value mb-1">
                  {cars?.data?.total_trims ?? '-'}
                </h3>
              </CardBody>
            </Card>
          </Col>
          <Col lg={3} md={6} className="mb-3">
            <Card className="statistics-kpi-card">
              <CardBody>
                <p className="statistics-kpi-label mb-2">
                  {translate('featured') || 'Featured'}
                </p>
                <h3 className="statistics-kpi-value mb-1">
                  {cars?.data?.featured_trims ?? '-'}
                </h3>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={6} className="mb-4">
            <Card className="statistics-chart-card">
              <CardBody>
                <h5 className="statistics-card-title mb-3">
                  {translate('cars.by.body.type') || 'Trims by body type'}
                </h5>
                <HorizontalBarChart
                  data={trimsByBodyType.map((b: any) => ({
                    ...b,
                    label: b.type,
                  }))}
                  valueKey="count"
                  labelKey="label"
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card className="statistics-chart-card">
              <CardBody>
                <h5 className="statistics-card-title mb-3">
                  {translate('cars.published.chart') || 'Cars published chart'}
                </h5>
                <SimpleLineChart data={carChartData} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  const renderCommunityTab = () => (
    <>
      <Row className="mb-4">
        <Col lg={4} md={6} className="mb-3">
          <Card className="statistics-kpi-card">
            <CardBody>
              <p className="statistics-kpi-label mb-2">
                {translate('reviews') || 'Reviews'}
              </p>
              <h3 className="statistics-kpi-value mb-2">
                {community?.data?.reviews?.total ?? '-'}
              </h3>
              <p className="mb-0 statistics-kpi-label">
                {translate('pending') || 'Pending'}:{' '}
                <span className="statistics-kpi-meta">
                  {community?.data?.reviews?.pending ?? '-'}
                </span>
              </p>
              <p className="mb-0 statistics-kpi-label">
                {translate('approved') || 'Approved'}:{' '}
                <span className="statistics-kpi-meta">
                  {community?.data?.reviews?.approved ?? '-'}
                </span>
              </p>
                <p className="mb-0 statistics-kpi-label">
                {translate('avg.rating') || 'Avg rating'}:{' '}
                <span className="statistics-kpi-meta">
                  {community?.data?.reviews?.avg_rating ?? '-'}
                </span>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-3">
          <Card className="statistics-kpi-card">
            <CardBody>
              <p className="statistics-kpi-label mb-2">
                {translate('questions') || 'Questions'}
              </p>
              <h3 className="statistics-kpi-value mb-2">
                {community?.data?.questions?.total ?? '-'}
              </h3>
              <p className="mb-0 statistics-kpi-label">
                {translate('unanswered') || 'Unanswered'}:{' '}
                <span className="statistics-kpi-meta">
                  {community?.data?.questions?.unanswered ?? '-'}
                </span>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col lg={4} md={6} className="mb-3">
          <Card className="statistics-kpi-card">
            <CardBody>
              <p className="statistics-kpi-label mb-2">
                {translate('answers') || 'Answers'}
              </p>
              <h3 className="statistics-kpi-value mb-2">
                {community?.data?.answers?.total ?? '-'}
              </h3>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="statistics-chart-card">
            <CardBody>
              <h5 className="statistics-card-title mb-3">
                {translate('reviews.activity.chart') ||
                  'Reviews activity chart'}
              </h5>
              <SimpleLineChart data={communityReviewsChartData} />
            </CardBody>
          </Card>
        </Col>
        <Col lg={6} className="mb-4">
          <Card className="statistics-chart-card">
            <CardBody>
              <h5 className="statistics-card-title mb-3">
                {translate('questions.activity.chart') ||
                  'Questions activity chart'}
              </h5>
              <SimpleLineChart data={communityQuestionsChartData} />
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );

  const renderEngagementTab = () => {
    const topRated = engagement?.data?.top_10_rated_trims || [];
    const topReviewed = engagement?.data?.top_10_most_reviewed_trims || [];
    const topAsked = engagement?.data?.top_10_most_asked_models || [];
    const topReviewers = engagement?.data?.top_10_most_active_reviewers || [];

    return (
      <>
        <Row>
          <Col lg={6} className="mb-4">
            <Card className="statistics-chart-card">
              <CardBody>
                <h5 className="statistics-card-title mb-3">
                  {translate('top.rated.trims') || 'Top 10 rated trims'}
                </h5>
                <HorizontalBarChart
                  data={topRated.map((t: any) => ({
                    ...t,
                    label: `${t.make} ${t.model} - ${t.name}`,
                  }))}
                  valueKey="score"
                  labelKey="label"
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card className="statistics-chart-card">
              <CardBody>
                <h5 className="statistics-card-title mb-3">
                  {translate('most.reviewed.trims') ||
                    'Top 10 most reviewed trims'}
                </h5>
                <HorizontalBarChart
                  data={topReviewed.map((t: any) => ({
                    ...t,
                    label: `${t.make} ${t.model} - ${t.name}`,
                  }))}
                  valueKey="count"
                  labelKey="label"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg={6} className="mb-4">
            <Card className="statistics-chart-card">
              <CardBody>
                <h5 className="statistics-card-title mb-3">
                  {translate('most.asked.models') || 'Top 10 most asked models'}
                </h5>
                <HorizontalBarChart
                  data={topAsked.map((m: any) => ({
                    ...m,
                    label: `${m.make} ${m.model}`,
                  }))}
                  valueKey="count"
                  labelKey="label"
                />
              </CardBody>
            </Card>
          </Col>
          <Col lg={6} className="mb-4">
            <Card className="statistics-chart-card">
              <CardBody>
                <h5 className="statistics-card-title mb-3">
                  {translate('most.active.reviewers') ||
                    'Top 10 most active reviewers'}
                </h5>
                <HorizontalBarChart
                  data={topReviewers.map((u: any) => ({
                    ...u,
                    label: u.user,
                  }))}
                  valueKey="count"
                  labelKey="label"
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    );
  };

  const renderActivityTab = () => (
    <Row>
      <Col lg={12}>
        <Card className="statistics-chart-card">
          <CardBody>
            <h5 className="statistics-card-title mb-3">
              {translate('activity.charts') || 'Activity charts'}
            </h5>
            <ActivityMultiLineChart data={activityChartData} />
          </CardBody>
        </Card>
      </Col>
    </Row>
  );

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverviewTab();
      case 'users':
        return renderUsersTab();
      case 'cars':
        return renderCarsTab();
      case 'community':
        return renderCommunityTab();
      case 'engagement':
        return renderEngagementTab();
      case 'activity':
        return renderActivityTab();
      default:
        return null;
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="mb-3">
            <Col>
              <h4 className="mb-1 statistics-page-title">
                {translate('statistics') || 'Statistics'}
              </h4>
              {isAnyLoading && (
                <span className="text-muted small d-block mt-1">
                  {translate('loading') || 'Loading statistics...'}
                </span>
              )}
            </Col>
          </Row>

          <Row className="mb-4">
            <Col>
              <ul className="nav nav-pills statistics-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link statistics-tab-link ${
                      activeTab === 'overview' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('overview')}
                  >
                    {translate('overview') || 'Overview'}
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link statistics-tab-link ${
                      activeTab === 'users' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('users')}
                  >
                    {translate('users') || 'Users'}
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link statistics-tab-link ${
                      activeTab === 'cars' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('cars')}
                  >
                    {translate('cars') || 'Cars'}
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link statistics-tab-link ${
                      activeTab === 'community' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('community')}
                  >
                    {translate('community') || 'Community'}
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link statistics-tab-link ${
                      activeTab === 'engagement' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('engagement')}
                  >
                    {translate('engagement') || 'Engagement'}
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link statistics-tab-link ${
                      activeTab === 'activity' ? 'active' : ''
                    }`}
                    onClick={() => setActiveTab('activity')}
                  >
                    {translate('activity.charts') || 'Activity charts'}
                  </button>
                </li>
              </ul>
            </Col>
          </Row>

          {renderActiveTabContent()}
        </Container>
      </div>
    </React.Fragment>
  );
};

export default StatisticsPage;
