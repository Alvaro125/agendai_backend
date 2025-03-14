import { Controller, Post, Body, UseGuards, Req, Get } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/infra/auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AttendanceDto } from './application/dto/attendance.dto';
import { AttendanceService } from './application/services/attendance.service';
@ApiBearerAuth()
@Controller('api/attendance')
@UseGuards(AuthGuard)
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
  @ApiOperation({ summary: 'Attendance register' })
  listAll() {
    const att = AttendanceDto.toDomain(body);
    att.setEmpresa(request['user']['sub'] as number);
    return this.attendanceService.create(att);
  }
}
