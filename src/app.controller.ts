import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service.ts';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) { }

  @Post('auth/register')
  register(@Body() CreateUserDto: CreateUserDto) {
    return this.usersService.register(CreateUserDto);
  }
  
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
    }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
