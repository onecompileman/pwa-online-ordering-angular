import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Breadcrumb } from "src/app/shared/models/breadcrumb.model";

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbService {
    breadcrumbs$: BehaviorSubject<Breadcrumb[]> = new BehaviorSubject([{
        text: 'Home'
    }])
}