import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiBearerAuth,
  ApiCookieAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AttendanceDto } from './application/dto/attendance.dto';
import { AttendanceService } from './application/services/attendance.service';
import { JwtGuard } from 'src/infra/guards/jwt-auth.guard';
@ApiBearerAuth()
@Controller('api/attendance')
@ApiTags('attendance')
@UseGuards(JwtGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('create')
  @ApiOperation({ summary: 'Attendance register' })
  create(@Body() body: AttendanceDto, @Req() request: Request) {
    const att = AttendanceDto.toDomain(body);
    att.setEmpresa(request['user']['sub'] as number);
    return this.attendanceService.create(att);
  }

  @Get('/all')
  @ApiOperation({ summary: 'Attendance list' })
  async listAll(@Req() request: Request) {
    return await this.attendanceService.listByEmpresa(
      request['user']['sub'] as number,
    );
  }
  @Get(':id')
  @ApiOperation({ summary: 'Attendance list' })
  async getByID(@Param('id') id: number, @Req() request: Request) {
    return await this.attendanceService.getByID(
      request['user']['sub'] as number,
      id,
    );
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Remove Attendance' })
  async deleteByID(@Param('id') id: number, @Req() request: Request) {
    return await this.attendanceService.deleteByID(
      request['user']['sub'] as number,
      id,
    );
  }
}
