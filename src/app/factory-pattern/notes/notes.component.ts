import { Component, Injectable, Injector } from '@angular/core';
import { fromEvent, map, merge, startWith } from 'rxjs';

export interface INote {
  name: string;
}
export interface INoteApiService {
  save: (note: INote) => void;
}

// @Injectable({
//   providedIn: 'root',
// })
// class NoteServiceFactoryV1 {
//   constructor(private readonly injector: Injector) {}

//   public getNoteService(): INoteApiService {
//     if (window.navigator.onLine) {
//       return this.injector.get(OnlineNoteApiService);
//     } else {
//       return this.injector.get(OfflineNoteApiService);
//     }
//   }
// }
@Injectable({
  providedIn: 'root',
})
class NoteServiceFactoryV2 {
  private currentService!: INoteApiService;

  constructor(private readonly injector: Injector) {
    this.setApiService(window.navigator.onLine);
    this.listenToConnection();
  }

  public getNoteService(): INoteApiService {
    return this.currentService;
  }

  private listenToConnection(): void {
    merge(
      fromEvent(window, 'online').pipe(map(() => true)),
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(document, 'DOMContentLoaded').pipe(map(() => navigator.onLine)) // current status
    )
      .pipe(startWith(window.navigator.onLine))
      .subscribe((isOnline: boolean) => {
        console.log('isOnline', isOnline);
        this.setApiService(isOnline);
      });
  }

  private setApiService(isOnline: boolean): void {
    if (isOnline) {
      this.currentService = this.injector.get(OnlineNoteApiService);
    } else {
      this.currentService = this.injector.get(OfflineNoteApiService);
    }
  }
}

@Injectable({
  providedIn: 'root',
})
export class OfflineNoteApiService implements INoteApiService {
  public save(data: INote): void {
    console.log('Save Offline', data);
  }
}

@Injectable({
  providedIn: 'root',
})
export class OnlineNoteApiService implements INoteApiService {
  public save(data: INote): void {
    console.log('Save Online', data);
  }
}

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private readonly noteServiceFactory: NoteServiceFactoryV2) {}

  public saveNote(data: INote): void {
    const noteApiService = this.createNoteService();
    noteApiService.save(data);
  }

  private createNoteService(): INoteApiService {
    return this.noteServiceFactory.getNoteService();
  }
}

@Component({
  standalone: true,
  selector: 'app-notes',
  template: ``,
  styles: ``,
})
export class NotesComponent {
  constructor(private readonly noteService: NoteService) {
    setInterval(() => {
      this.noteService.saveNote({ name: 'some-name' });
    }, 2000);
  }
}
