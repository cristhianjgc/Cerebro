import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    constructor()
    {

    }

    clearSessionStorage(): void {
        sessionStorage.clear();
    }

    getItemFromSessionStorage(key: string): string {
        return sessionStorage.getItem(key)!;
    }

    removeItemFromSessionStorage(key: string): void {
        sessionStorage.removeItem(key);
    }

    setItemToSessionStorage(key: string, item: string): void {
        sessionStorage.setItem(key, item);
    }
}
