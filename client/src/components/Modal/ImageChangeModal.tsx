import React, { useState } from 'react';
import { ChangeEvent } from 'react';
import { Button, Dialog, DialogBody, DialogFooter, Input } from '@material-tailwind/react';
import { useAppDispatch } from 'hooks/hooks';
import axios from 'axios';
import { updateUserImage } from '../../redux/slice/MemberSlice';

type props = {
  text: string;
  warning: string;
  btnName: string;
  btnCheck: string;
  changeItem: string;
  userId: number;
  teacher: boolean;
};

export const ImageChangeModal = ({
  text,
  warning,
  btnName,
  btnCheck,
  changeItem,
  userId,
  teacher,
}: props) => {
  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const apiURL = 'http://ec2-3-34-116-209.ap-northeast-2.compute.amazonaws.com:8080';
  const dispatch = useAppDispatch();

  console.log(userId, teacher);

  const handleNameChange = async (newName: string) => {
    try {
      const data = {
        id: userId,
        [changeItem]: newName,
      };
      console.log(data);
      const accessToken = localStorage.getItem('access_jwt');
      const targetURL = `${apiURL}/${teacher === false ? 'students' : 'teachers'}/${changeItem}`;
      const updateItems = `updateUser${changeItem}`;
      console.log(updateItems);
      const response = await axios.patch(targetURL, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      dispatch(updateUserImage(response.data.profileImg));
    } catch (error) {
      console.log(`${changeItem}`, error);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleClick = () => {
    handleNameChange(inputValue);
    handleOpen();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        size="sm"
        color="gray"
        className="w-5 h-5 rounded-full mt-[-25px] bg-gray opacity-0"
      >
        {btnName}
      </Button>
      <Dialog open={open} handler={handleOpen} size="xs" className="overflow-hidden">
        <DialogBody divider>
          <div className="grid grid-flow-col">
            <Input
              label={text}
              crossOrigin={undefined}
              color="blue"
              className="text-black"
              value={inputValue}
              onChange={handleChange} // 입력 값을 업데이트
            />
            <Button
              variant="outlined"
              color="red"
              onClick={handleClick}
              className="col-span-1 p-2 ml-5"
            >
              {btnCheck}
            </Button>
          </div>
        </DialogBody>
        <DialogFooter className="flex justify-center space-x-2">
          <p className="text-xs text-black">{warning}</p>
        </DialogFooter>
      </Dialog>
    </>
  );
};