import { Moment } from 'moment';
import { ITeam } from 'app/shared/model/team.model';
import { IUser } from 'app/shared/model/user.model';
import { IDepartment } from 'app/shared/model/department.model';

export interface IEmployee {
  id?: number;
  ssoId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  hireDate?: Moment;
  team?: ITeam;
  manager?: IUser;
  department?: IDepartment;
}

export const defaultValue: Readonly<IEmployee> = {};
