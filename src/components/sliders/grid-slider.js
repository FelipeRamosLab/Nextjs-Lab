import Slider from 'react-slick';
import {useState, useEffect, useRef} from 'react';

export default function GridSlider({data, itemsPerPage}) {
    const [sliderPages, setSliderPages] = useState([]);
    const sliderPagesTemp = [];
    const perPage = useRef();

    useEffect(() => {
        let items = itemsPerPage || 8;

        if (window.innerWidth < 600) {
            perPage.current = items / 2;
        } else {
            perPage.current = items;
        }

        if (perPage.current > data.length) {
            perPage.current = data.length;
        }

        data?.reduce((a, b, index) => {
            if ((index + 1) % perPage.current === 0) {
                sliderPagesTemp.push([...a, b]);
                return [];
            }
    
            if ((index + 1) % perPage.current > 0) {
                return [...a, b];
            }
        }, []);

        setSliderPages(sliderPagesTemp);
    }, []);

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
            {sliderPages?.map((page, i) => <div key={'sliderPage'+i} className="slider-item">
                {page?.map((item, index) => <div key={item.label + index} className="item">
                    <label>{item.label}</label>
                    <span className="value">{item.value}</span>
                </div>)}
            </div>)}
        </Slider>
    )
}
