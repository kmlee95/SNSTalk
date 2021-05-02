import React, { useState } from 'react';
import Slick from 'react-slick';
import { backUrl } from '@config/.';

import { Overlay, Header, CloseBtn, ImgWrapper, Indicator, SlickWrapper } from './styled';
import { PostImage } from '@src/types/post';

interface ImagesZoomProps {
  images: PostImage[];
  onClose: (e: React.MouseEvent<HTMLElement>) => void;
}

const ImagesZoom = ({ images, onClose }: ImagesZoomProps) => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  return (
    <Overlay>
      <Header>
        <h1>상세 이미지</h1>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            beforeChange={(slide, newSlide) => setCurrentSlide(newSlide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImgWrapper key={v.src}>
                {/* <img src={`${v.src.replace(/\/thumb\//, '/original/')}`} alt={v.src} /> */}
                <img src={`${backUrl}/${v.src}`} alt={v.src} />
              </ImgWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} /{images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};

export default ImagesZoom;
