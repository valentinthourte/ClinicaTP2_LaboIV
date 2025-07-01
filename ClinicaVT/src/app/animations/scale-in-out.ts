import {
  trigger,
  style,
  animate,
  transition,
  state,
  AnimationTriggerMetadata,
} from '@angular/animations';

export const scaleInOut: AnimationTriggerMetadata = trigger('scaleInOut', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.5)' }),
    animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' })),
  ]),
  transition(':leave', [
    animate('300ms ease-in', style({ opacity: 0, transform: 'scale(0.5)' })),
  ]),
]);