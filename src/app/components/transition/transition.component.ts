import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transition',
  templateUrl: './transition.component.html',
  styleUrls: ['./transition.component.scss']
})
export class TransitionComponent implements OnInit {
  displayText = "";
  transitionText = "struct group_info init_groups = { .usage = ATOMIC_INIT(2) };\n\n\tstruct group_info *groups_alloc(int gidsetsize){" +
                   "\tstruct group_info *group_info;\n\n" + 
                   "\tint nblocks;\n\n" + 
                   "\tint i;\n\n\n\n" +
                   "\tnblocks = (gidsetsize + NGROUPS_PER_BLOCK - 1) / NGROUPS_PER_BLOCK;\n\n" +
	                 "\t/* Make sure we always allocate at least one indirect block pointer */\n\n" +
	                 "\tnblocks = nblocks ? : 1;\n\n" +
	                 "\tgroup_info = kmalloc(sizeof(*group_info) + nblocks*sizeof(gid_t *), GFP_USER);\n\n" +
	                 "\tif (!group_info)\n\n" +
                   "\t\treturn NULL;\n\n" +
	                 "\tgroup_info->ngroups = gidsetsize;\n\n" +
                   "\tgroup_info->nblocks = nblocks;\n\n" +
                   "\tatomic_set(&group_info->usage, 1);\n\n\n\n" +
                   "\tif (gidsetsize <= NGROUPS_SMALL)\n\n" +
                   "\t	group_info->blocks[0] = group_info->small_block;\n\n" +
                   "\telse {\n\n" +
                   "\t	for (i = 0; i < nblocks; i++) {\n\n" +
                   "\t		gid_t *b;\n\n" +
                   "\t		b = (void *)__get_free_page(GFP_USER);\n\n" +
                   "\t		if (!b)\n\n" +
                   "\t			goto out_undo_partial_alloc;\n\n" +
                   "\t		group_info->blocks[i] = b;\n\n" +
                   "\t	}\n\n" +
                   "\t}\n\n" +
                   "\treturn group_info;\n\n";

  interval: any;

  constructor(private router: Router) { 
  }

  ngOnInit(): void {
    const time = 25;
    let length = 0;
    this.interval = setInterval(() => {
      length = Math.random() * 5;
      this.displayText += this.transitionText.substring(this.displayText.length, this.displayText.length + 10);
      if(this.displayText === this.transitionText) {
        clearInterval(this.interval);
        this.router.navigate(['/login']);
      }
    }, time);
  }

}
