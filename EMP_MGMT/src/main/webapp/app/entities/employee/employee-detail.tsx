import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmployeeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeDetail = (props: IEmployeeDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { employeeEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterDemoApp.employee.detail.title">Employee</Translate> [<b>{employeeEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="ssoId">
              <Translate contentKey="jhipsterDemoApp.employee.ssoId">Sso Id</Translate>
            </span>
            <UncontrolledTooltip target="ssoId">
              <Translate contentKey="jhipsterDemoApp.employee.help.ssoId" />
            </UncontrolledTooltip>
          </dt>
          <dd>{employeeEntity.ssoId}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="jhipsterDemoApp.employee.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="jhipsterDemoApp.employee.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="jhipsterDemoApp.employee.email">Email</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.email}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="jhipsterDemoApp.employee.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{employeeEntity.phoneNumber}</dd>
          <dt>
            <span id="hireDate">
              <Translate contentKey="jhipsterDemoApp.employee.hireDate">Hire Date</Translate>
            </span>
          </dt>
          <dd>
            <TextFormat value={employeeEntity.hireDate} type="date" format={APP_DATE_FORMAT} />
          </dd>
          <dt>
            <Translate contentKey="jhipsterDemoApp.employee.team">Team</Translate>
          </dt>
          <dd>{employeeEntity.team ? employeeEntity.team.teamName : ''}</dd>
          <dt>
            <Translate contentKey="jhipsterDemoApp.employee.manager">Manager</Translate>
          </dt>
          <dd>{employeeEntity.manager ? employeeEntity.manager.firstName + employeeEntity.manager.lastName: ''}</dd>
          <dt>
            <Translate contentKey="jhipsterDemoApp.employee.department">Department</Translate>
          </dt>
          <dd>{employeeEntity.department ? employeeEntity.department.departmentName : ''}</dd>
        </dl>
        <Button tag={Link} to="/employee" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/employee/${employeeEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ employee }: IRootState) => ({
  employeeEntity: employee.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeDetail);
