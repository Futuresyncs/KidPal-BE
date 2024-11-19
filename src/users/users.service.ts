import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { UpdateUserDto } from './dto/update-user-dto';

@Injectable()
export class UsersService {
  private users = [
    { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'Editor',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
      role: 'Viewer',
    },
    {
      id: 4,
      name: 'Bob Brown',
      email: 'bob.brown@example.com',
      role: 'Contributor',
    },
    {
      id: 5,
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      role: 'Manager',
    },
    {
      id: 6,
      name: 'Michael Wilson',
      email: 'michael.wilson@example.com',
      role: 'Viewer',
    },
    {
      id: 7,
      name: 'Sarah Miller',
      email: 'sarah.miller@example.com',
      role: 'Viewer',
    },
    {
      id: 8,
      name: 'David Garcia',
      email: 'david.garcia@example.com',
      role: 'Contributor',
    },
    {
      id: 9,
      name: 'Chris Lee',
      email: 'chris.lee@example.com',
      role: 'Editor',
    },
    {
      id: 10,
      name: 'Sophia Martinez',
      email: 'sophia.martinez@example.com',
      role: 'Viewer',
    },
    {
      id: 11,
      name: 'Daniel White',
      email: 'daniel.white@example.com',
      role: 'Viewer',
    },
    {
      id: 12,
      name: 'Olivia Harris',
      email: 'olivia.harris@example.com',
      role: 'Manager',
    },
    {
      id: 13,
      name: 'Matthew Clark',
      email: 'matthew.clark@example.com',
      role: 'Editor',
    },
    {
      id: 14,
      name: 'Isabella Lopez',
      email: 'isabella.lopez@example.com',
      role: 'Contributor',
    },
    {
      id: 15,
      name: 'Ethan Hall',
      email: 'ethan.hall@example.com',
      role: 'Viewer',
    },
  ];

  findAll(role?: 'Viewer' | 'Admin' | 'Editor') {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (rolesArray.length === 0)
        throw new NotFoundException('user role not found');
      return rolesArray[0];
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User Not found');
    return user;
  }

  create(user: CreateUserDto) {
    const newUser = {
      id: 1 + Math.random(),
      ...user,
    };

    this.users.push(newUser);
    return newUser;
  }
  update(id: number, updateUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updateUser };
      }
      return user;
    });

    this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return removedUser;
  }
}
