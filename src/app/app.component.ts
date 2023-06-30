import { Component, OnDestroy } from '@angular/core';
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnDestroy {
  editor = new Editor({
    extensions: [StarterKit],
  });

  value =
    '<blockquote>I think where I am not, therefore I am where I do not think.</blockquote>';

  ngOnDestroy(): void {
    this.editor.destroy();
  }
}
