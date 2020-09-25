import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITeam } from 'app/shared/model/team.model';
import { getEntities as getTeams } from 'app/entities/team/team.reducer';
import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmployeeUpdate = (props: IEmployeeUpdateProps) => {
  const [teamId, setTeamId] = useState('0');
  const [managerId, setManagerId] = useState('0');
  const [departmentId, setDepartmentId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { employeeEntity, teams, users, departments, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/employee');
  };

  useEffect(() => {
    if (!isNew) {
      props.getEntity(props.match.params.id);
    }

    props.getTeams();
    props.getUsers();
    props.getDepartments();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.hireDate = convertDateTimeToServer(values.hireDate);

    if (errors.length === 0) {
      const entity = {
        ...employeeEntity,
        ...values
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="jhipsterDemoApp.employee.home.createOrEditLabel">
            <Translate contentKey="jhipsterDemoApp.employee.home.createOrEditLabel">Create or edit a Employee</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : employeeEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="employee-id">
                    <Translate contentKey="global.field.id">ID</Translate>
                  </Label>
                  <AvInput id="employee-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="ssoIdLabel" for="employee-ssoId">
                  <Translate contentKey="jhipsterDemoApp.employee.ssoId">Sso Id</Translate>
                </Label>
                <AvField id="employee-ssoId" type="text" name="ssoId" />
                <UncontrolledTooltip target="ssoIdLabel">
                  <Translate contentKey="jhipsterDemoApp.employee.help.ssoId" />
                </UncontrolledTooltip>
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="employee-firstName">
                  <Translate contentKey="jhipsterDemoApp.employee.firstName">First Name</Translate>
                </Label>
                <AvField id="employee-firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="employee-lastName">
                  <Translate contentKey="jhipsterDemoApp.employee.lastName">Last Name</Translate>
                </Label>
                <AvField id="employee-lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="employee-email">
                  <Translate contentKey="jhipsterDemoApp.employee.email">Email</Translate>
                </Label>
                <AvField id="employee-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="employee-phoneNumber">
                  <Translate contentKey="jhipsterDemoApp.employee.phoneNumber">Phone Number</Translate>
                </Label>
                <AvField id="employee-phoneNumber" type="text" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="hireDateLabel" for="employee-hireDate">
                  <Translate contentKey="jhipsterDemoApp.employee.hireDate">Hire Date</Translate>
                </Label>
                <AvInput
                  id="employee-hireDate"
                  type="datetime-local"
                  className="form-control"
                  name="hireDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.employeeEntity.hireDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label for="employee-team">
                  <Translate contentKey="jhipsterDemoApp.employee.team">Team</Translate>
                </Label>
                <AvInput id="employee-team" type="select" className="form-control" name="team.id">
                  <option value="" key="0" />
                  {teams
                    ? teams.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.teamName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employee-manager">
                  <Translate contentKey="jhipsterDemoApp.employee.manager">Manager</Translate>
                </Label>
                <AvInput id="employee-manager" type="select" className="form-control" name="manager.id">
                  <option value="" key="0" />
                  {users
                    ? users.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.firstName} {otherEntity.lastName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="employee-department">
                  <Translate contentKey="jhipsterDemoApp.employee.department">Department</Translate>
                </Label>
                <AvInput id="employee-department" type="select" className="form-control" name="department.id">
                  <option value="" key="0" />
                  {departments
                    ? departments.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.departmentName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/employee" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  teams: storeState.team.entities,
  users: storeState.userManagement.users,
  departments: storeState.department.entities,
  employeeEntity: storeState.employee.entity,
  loading: storeState.employee.loading,
  updating: storeState.employee.updating,
  updateSuccess: storeState.employee.updateSuccess
});

const mapDispatchToProps = {
  getTeams,
  getUsers,
  getDepartments,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeUpdate);
