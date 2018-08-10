import { PostCreateComponent} from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms'
import { AngularMaterialModule } from '../angular-material.module';
import { RouterModule } from '@angular/router';
import {CommonModule } from '@angular/common';

    @NgModule({

      declarations: [
  PostListComponent,
  PostCreateComponent
        ],
        imports: [
        CommonModule,
      ReactiveFormsModule,
      AngularMaterialModule,
      RouterModule  
        ]
    })
export class PostsModule {

}