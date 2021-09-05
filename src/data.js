// ДАННЫE ДЛЯ КАРТОЧЕК

const data = [
  { 
    id: 1,
    listTitle: 'Backlog',
    cards: [
      {
        id: 11,
        title: 'Twilio integration',
        description: 'Create new note via SMS. Support text, audio, links, and media.',
        theme: '',
        importance: false,
        done: false,
      },
      {
        id: 12,
        title: 'Markdown support',
        description: 'Markdown shorthand converts to formatting',
        theme: 'Formatting',
        importance: false,
        done: false,
      }
    ]
  },

  {
    id: 2,
    listTitle: 'To do',
    cards: [
      {
        id: 21,
        title: 'Tablet view',
        description: '',
        theme: '',
        importance: true,
        done: false,
      },
      {
        id: 22,
        title: 'Audio recording in note',
        description: 'Show audio in a note and playback UI',
        theme: 'Note interface',
        importance: false,
        done: false,
      },
      {
        id: 23,
        title: 'Bookmark in note',
        description: 'Show rich link UI in a note, and feature to render website screenshot.',
        theme: 'Note interface',
        importance: false,
        done: false,
      },
      {
        id: 24,
        title: 'Image viewer',
        description: 'Opens when clicking on the thumbnail in the list or on the image in the note',
        theme: '',
        importance: false,
        done: false,
      }
    ]
  },

  {
    id: 3,
    listTitle: 'In progress',
    cards: [
      {
        id: 31,
        title: 'Mobile view',
        description: 'Functions for both web responsive and native apps. Note: Android and iOS will need unique share icons.',
        theme: '',
        importance: true,
        done: false,
      },
      {
        id: 32,
        title: 'Desktop view',
        description: 'PWA for website and native apps. Note: Windows and Mac will need unique share icons.',
        theme: '',
        importance: true,
        done: false,
      },
      {
        id: 33,
        title: 'Formatting options',
        description: 'Mobile formatting bar expands and collapses when tapping the format icon.',
        theme: '',
        importance: false,
        done: false,
      },
      {
        id: 34,
        title: 'Media in note',
        description: 'Image & video with player UI',
        theme: 'Note interface',
        importance: false,
        done: false,
      }
    ]
  },

  {
    id: 4,
    listTitle: 'Designed',
    cards: [
      {
        id: 41,
        title: 'Audio recording',
        description: 'Interface for when recording a new audio note',
        theme: 'New note',
        importance: false,
        done: false,
      },
      {
        id: 4,
        title: 'Bookmarking',
        description: 'Interface for when creating a new link note.',
        theme: 'New note',
        importance: false,
        done: false,
      }
    ]
  }
];

export { data };