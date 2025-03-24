import { Injectable } from '@nestjs/common';
import { Link } from '../../domain/entities/link.entity';
import { LinkRepository } from '../../infrastructure/repositories/link.repository';

@Injectable()
export class LinkService {
  constructor(private readonly linkRepository: LinkRepository) {}
  async create(_data: Link): Promise<{ message: string }> {
    await this.linkRepository.create(_data);
    return { message: 'Link created' };
  }

  async findByEmpresa(id: number): Promise<Link[]|null> {
    return await this.linkRepository.findByEmpresa(id);
  }
}
