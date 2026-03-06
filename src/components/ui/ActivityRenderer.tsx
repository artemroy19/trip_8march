import type { Activity } from '../../data/places';
import { QuizActivity } from '../activities/QuizActivity';
import { PuzzleActivity } from '../activities/PuzzleActivity';
import { MorseActivity } from '../activities/MorseActivity';
import { ConfessionActivity } from '../activities/ConfessionActivity';
import { HeartsActivity } from '../activities/HeartsActivity';

interface ActivityRendererProps {
  activity: Activity;
  onCompleted: () => void;
}

export function ActivityRenderer({ activity, onCompleted }: ActivityRendererProps) {
  switch (activity.type) {
    case 'quiz':
      return <QuizActivity activity={activity} onCompleted={onCompleted} />;
    case 'puzzle':
      return <PuzzleActivity activity={activity} onCompleted={onCompleted} />;
    case 'morse':
      return <MorseActivity activity={activity} onCompleted={onCompleted} />;
    case 'confession':
      return <ConfessionActivity activity={activity} onCompleted={onCompleted} />;
    case 'hearts':
      return <HeartsActivity activity={activity} onCompleted={onCompleted} />;
    default:
      return null;
  }
}

