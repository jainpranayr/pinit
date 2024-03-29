import Masonry from 'react-masonry-css'
import Pin from './Pin'

// responsive breakpoints
const breakpointColumnsObj = {
	default: 4,
	3000: 6,
	2000: 5,
	1200: 3,
	1000: 2,
	500: 1,
}

const MasonryLayout = ({ pins }) => (
	// masonry layout config
	<Masonry
		className='flex flex-wrap justify-center animate-slide-fwd'
		breakpointCols={breakpointColumnsObj}>
		{pins?.map(pin => (
			<Pin key={pin._id} pin={pin} className='w-max' />
		))}
	</Masonry>
)

export default MasonryLayout
