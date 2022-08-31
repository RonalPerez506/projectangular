import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';
import { FormGroup, FormControl, Validators} from '@angular/forms';
      
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
       
  id!: number;
  post!: Post;
  form!: FormGroup;
     
  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    this.postService.find(this.id).subscribe((data: Post)=>{this.post = data;
    }); 

    console.log("-------------------error en edit component ts_----- " + this.id, this.form);
       
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      cel: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      nit: new FormControl('', [Validators.required])

      // name: new FormControl('', [Validators.required]),
      // lastname: new FormControl('', [Validators.required]),
      // cel: new FormControl('', Validators.required),
      // email: new FormControl('', Validators.required),
      // nit: new FormControl('', Validators.required)

      // name:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      // lastname:  new FormControl('', [ Validators.required, Validators.pattern('^[a-zA-ZÁáÀàÉéÈèÍíÌìÓóÒòÚúÙùÑñüÜ \-\']+') ]),
      // cel: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ]),
      // email: new FormControl('', [ Validators.required, Validators.email ]),
      // nit: new FormControl('', [ Validators.required, Validators.pattern("^[0-9]*$") ])
    });
    console.log("-------------------error en edit component ts_2----- " + this.id, this.form.value);

  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }
     
  /**
   * Write code on Method
   *
   * @return response()
   */
  submit(){
    console.log("-------------------error en edit component ts_3----- " + this.id);
    if (this.form.valid) {
      return;
    }
    console.log(this.form.value);
    let post: Post = this.form.value;
    this.postService.update(this.id, post).subscribe((res:any) => {
         console.log('Post updated successfully!');
         this.router.navigateByUrl('post/index');
    })
  }

  onSubmit(){
    if (!this.form.valid) {
      return;
    }
    let post: Post = this.form.value;
    this.postService.update(this.id, post).subscribe((res:any) => {         
         this.router.navigateByUrl('post/index');
    })
  }
    
}