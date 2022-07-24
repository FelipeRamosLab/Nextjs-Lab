import Slider from 'react-slick';

export default function GridSlider({data, pageData}) {
    return (
        <Slider
            className="grid-slider"
            centerMode={true}
            centerPadding="0"
            slidesToShow={3}
            dots={true}
            infinite={false}
            responsive={[{
                breakpoint: 601,
                settings: {
                    arrows: false,
                    slidesToShow: 1
                }
            }]}
        >
            <div className="slide-wrap">
                <div className="slider-item">
                    <div className="item">
                        <label>item1</label>
                        <span className="value">$ 10000</span>
                    </div>
                    <div className="item">
                        <label>item1</label>
                        <span className="value">$ 10000</span>
                    </div>
                    <div className="item">
                        <label>item1</label>
                        <span className="value">$ 10000</span>
                    </div>
                    <div className="item">
                        <label>item1</label>
                        <span className="value">$ 10000</span>
                    </div>
                </div>
            </div>
        </Slider>
    )
}
