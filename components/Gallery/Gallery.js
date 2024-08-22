"use client";
import { Dialog, DialogContent, ImageList, ImageListItem } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

export default function Gallery({ itemData, scrollPosition }) {
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClickOpen = (image) => {
    setSelectedImage(image);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedImage(null);
  };
  return (
    <>
      <ImageList
        variant="masonry"
        cols={3}
        gap={8}
        sx={{
          columnCount: {
            xs: "1 !important",
            sm: "2 !important",
            md: "3 !important",
            lg: "3 !important",
            xl: "3 !important",
          },
        }}
      >
        {itemData?.map((item) => (
          <ImageListItem
            key={item?.img?.src}
            onClick={() => handleClickOpen(item?.img?.src)}
          >
            {/* <img
          srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
          src={`${item.img}?w=248&fit=crop&auto=format`}
          alt={item?.title}
          className="rounded-md"
        /> */}
            <img
              alt={item?.title}
              src={`${item?.img?.src}?w=248&fit=crop&auto=format`}
              srcSet={`${item?.img?.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              scrollPosition={scrollPosition}
              className="cursor-pointer"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogContent>
          {selectedImage && (
            <Image
              src={selectedImage}
              alt={selectedImage.title}
              layout="responsive"
              width={1000}
              height={1000}
              objectFit="contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
