import { Node } from '@tiptap/core';

export const CustomParagraphExtension = Node.create({
  name: 'customParagraph',
  group: 'block',
  content: 'inline*',
  parseHTML() {
    return [
      {
        tag: 'p.my-custom-p-tag',
      },
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      'p',
      {
        class: 'my-custom-p-tag',
        ...HTMLAttributes,
      },
      0,
    ];
  },
});
