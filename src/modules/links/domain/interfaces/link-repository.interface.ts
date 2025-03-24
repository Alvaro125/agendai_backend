import { Link } from '../entities/link.entity';

export interface ILinkRepository {
  // findByIdAndEmpresa(id: number, busi: number): Promise<Attendance | null>;
  // findByEmpresa(busi: number): Promise<Attendance[] | null>;
  create(att: Link): Promise<Link | null>;
  //   update(user: User): Promise<void>;
  //   delete(id: string): Promise<void>;
}
