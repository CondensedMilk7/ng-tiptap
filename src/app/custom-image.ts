import { Node } from '@tiptap/core';

export const ImageWithButtons = Node.create({
  name: 'imageWithButtons',

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
        tag: 'div.image-with-buttons',
      },
    ];
  },

  renderHTML({ node }) {
    const imgElement = document.createElement('img');
    imgElement.src = node.attrs['src'];
    imgElement.className = 'image-button-img';

    const button1Element = document.createElement('button');
    button1Element.className = 'button1';
    button1Element.textContent = 'Right';

    const button2Element = document.createElement('button');
    button2Element.className = 'button2';
    button2Element.textContent = 'Left';

    const button3Element = document.createElement('button');
    button3Element.className = 'button3';
    button3Element.textContent = 'Center';

    const containerElement = document.createElement('div');
    containerElement.className = 'image-with-buttons';
    containerElement.appendChild(imgElement);
    containerElement.appendChild(button1Element);
    containerElement.appendChild(button2Element);
    containerElement.appendChild(button3Element);

    button1Element.addEventListener('click', () => {
      containerElement.classList.remove('class2', 'class3');
      containerElement.classList.toggle('class1');
    });

    button2Element.addEventListener('click', () => {
      containerElement.classList.remove('class1', 'class3');
      containerElement.classList.toggle('class2');
    });

    button3Element.addEventListener('click', () => {
      containerElement.classList.remove('class1', 'class2');
      containerElement.classList.toggle('class3');
    });

    return containerElement;
  },
});
