import { Injector, inject } from '@angular/core';
import { Node, mergeAttributes } from '@tiptap/core';
import { EditorButtonsService } from './services/editor-buttons.service';
import { AngularNodeViewRenderer } from 'ngx-tiptap';
import { ImageComponent } from './image/image.component';

export const ImageComponentExtension = (injector: Injector): Node => {
  return Node.create({
    name: 'img',

    group: 'block',

    inline: false,

    atom: true,

    addAttributes() {
      return {
        src: {
          default: null,
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: 'img',
        },
      ];
    },

    addNodeView() {
      return AngularNodeViewRenderer(ImageComponent, { injector });
    },

    renderHTML({ node, HTMLAttributes }) {
      return ['img', mergeAttributes(HTMLAttributes)];
      // const imgElement = document.createElement('img');
      // imgElement.src = node.attrs['src'];
      // imgElement.className = 'image-button-img';

      // const button1Element = document.createElement('button');
      // button1Element.className = 'button1';
      // button1Element.textContent = 'Right';

      // const button2Element = document.createElement('button');
      // button2Element.className = 'button2';
      // button2Element.textContent = 'Left';

      // const button3Element = document.createElement('button');
      // button3Element.className = 'button3';
      // button3Element.textContent = 'Center';

      // const containerElement = document.createElement('div');
      // containerElement.className = 'image-with-buttons';
      // containerElement.appendChild(imgElement);
      // containerElement.appendChild(button1Element);
      // containerElement.appendChild(button2Element);
      // containerElement.appendChild(button3Element);

      // button1Element.addEventListener('click', () => {
      //   containerElement.classList.remove('class2', 'class3');
      //   containerElement.classList.toggle('class1');
      // });

      // button2Element.addEventListener('click', () => {
      //   containerElement.classList.remove('class1', 'class3');
      //   containerElement.classList.toggle('class2');
      // });

      // button3Element.addEventListener('click', () => {
      //   containerElement.classList.remove('class1', 'class2');
      //   containerElement.classList.toggle('class3');
      // });

      // return containerElement;
    },
  });
};
