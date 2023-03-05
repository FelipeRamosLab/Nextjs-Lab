import Slider from 'react-slick';

export default function GridSlider({data}) {
    return (
        <Slider
            className="grid-slider"
            centerMode={true}
            centerPadding="0"
            slidesToShow={1}
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
                    {data?.map((item, index) => <div key={item.label + index} className="item">
                        <label>{item.label}</label>
                        <span className="value">{item.value}</span>
                    </div>)}
                </div>
            </div>
        </Slider>
    )
}
