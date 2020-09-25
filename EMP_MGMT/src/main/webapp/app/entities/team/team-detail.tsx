import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './team.reducer';
import { getEntitiesByTeam } from '../employee/employee.reducer';
import { ITeam } from 'app/shared/model/team.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Employee } from '../employee/employee';

export interface ITeamDetailProps extends EmpStateProps, EmpDispatchProps, StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TeamDetail = (props: ITeamDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { teamEntity } = props;

  useEffect(() => {
    props.getEntitiesByTeam(props.match.params.id);
  }, []);

  const {employeeList} = props

  
  return (
    <Row>
      <Col md="8">
        <h2>
          <Translate contentKey="jhipsterDemoApp.team.detail.title">Team</Translate> [<b>{teamEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="teamName">
              <Translate contentKey="jhipsterDemoApp.team.teamName">Team Name</Translate>
            </span>
          </dt>
          <dd>{teamEntity.teamName}</dd>
          <dt>
            <span id="clientName">
              <Translate contentKey="jhipsterDemoApp.team.clientName">Client Name</Translate>
            </span>
          </dt>
          <dd>{teamEntity.clientName}</dd>
        </dl>
        <Button tag={Link} to="/team" replace color="info">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/team/${teamEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
      
    </Row>
  );
};


const mapDispatchToProps = { getEntity, getEntitiesByTeam};

const mapStateToProps = ({ team }: IRootState) => ({
  teamEntity: team.entity
});

const mapEmpStateToProps = ({ employee }: IRootState) => ({
  employeeList: employee.entities,
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

type EmpStateProps = ReturnType<typeof mapEmpStateToProps>;
type EmpDispatchProps = typeof mapDispatchToProps;

connect(mapEmpStateToProps, mapDispatchToProps)(Employee);
export default connect(mapStateToProps, mapDispatchToProps)(TeamDetail);
