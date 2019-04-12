import { Params } from '@angular/router';

import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducer: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer
}
