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
    return [
      'div',
      { class: 'image-with-buttons' },
      ['img', { src: node.attrs['src'] }],
      ['button', { onclick: 'onAction1()' }, 'Button 1'],
      ['button', { onclick: 'onAction2()' }, 'Button 2'],
      ['button', { onclick: 'onAction3()' }, 'Button 3'],
    ];
  },
});
