import { trigger, style, animate, transition } from '@angular/animations';

export const sidebarSlideIn = trigger('sidebarSlideIn', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
  ])
]);

export const contentSlideIn = trigger('contentSlideIn', [
  transition(':enter', [
    style({ transform: 'translateX(100%)', opacity: 0 }),
    animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 })),
  ])
]);