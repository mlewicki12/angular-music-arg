import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlMatchResult, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { BackdoorComponent } from '../components/backdoor/backdoor.component';
import { ErrorComponent } from '../components/error/error.component';
import { FileComponent } from '../components/file/file.component';
import { LogComponent } from '../components/log/log.component';
import { LoginComponent } from '../components/login/login.component';
import { PageNotFoundComponent } from '../components/page-not-found/page-not-found.component';
import { TransitionComponent } from '../components/transition/transition.component';

// pulled from https://stackoverflow.com/questions/44810860/forward-slash-in-angular-route-parameters
function filepathMatcher(segments: UrlSegment[], 
                         group: UrlSegmentGroup, 
                         route: Route) : UrlMatchResult | null {
  // match urls like "/files/:filepath" where filepath can contain '/'
  if (segments.length > 0) {
    // if first segment is 'files', then concat all the next segments into a single one
    // and return it as a parameter named 'filepath'
    if (segments[0].path == "files") {
      return {
        consumed: segments,
        posParams: {
          path: new UrlSegment(segments.slice(1).join("/"), {})
        }
      };
    }
  }

  return null;
}

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'hack', component: TransitionComponent},
  {path: 'backdoor/:id', component: BackdoorComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'log/:id', component: LogComponent},
  {matcher: filepathMatcher, component: FileComponent},
  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }