import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem("token");
        let jsonReq = req;
        if (token) {
            jsonReq = req.clone({
                headers: req.headers.set("Authorization",
                "Bearer " + token)
            });
        } 
        return next.handle(jsonReq);
    }
}