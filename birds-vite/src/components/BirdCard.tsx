import { Link } from 'react-router-dom';
import WatermarkedImage from '@/components/images/WatermarkedImage';
import type { Bird } from '@/types/bird';

type Props = {
  bird: Bird,
  priority?: number
}

const BirdCard = ({ bird, priority }: Props) => {
  return (
    <Link
      to={`/birds/${bird.id}`}
      className="group space-y-3 w-[168px]"
    >
      <div className="aspect-video relative rounded-lg overflow-hidden transition-transform duration-200 group-hover:shadow-lg group-hover:scale-103">
        <WatermarkedImage
          url={bird.thumbUrl}
          alt={bird.englishName}
          priority={priority}
        />
      </div>
      <div className="pb-3">
        <div className="font-medium text-base text-blue-tide-900">{bird.englishName}</div>
        <div className="font-normal text-sm text-blue-tide-300">{bird.latinName}</div>
      </div>
    </Link>
  )
}

export default BirdCard
