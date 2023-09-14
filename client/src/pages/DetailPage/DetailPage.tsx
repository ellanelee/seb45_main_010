import { Button } from '@material-tailwind/react';
import { BsChevronDown } from 'react-icons/bs';
import { DetailType } from 'Types/Types';
import RequestBtn from 'components/DetailPage/RequestBtn';
import TeacherInfo1 from 'components/DetailPage/TeacherInfo1';
import TeacherInfo2 from 'components/DetailPage/TeacherInfo2';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { useEffect, useState } from 'react';
import { teacherDetail } from 'redux/slice/DetailPageSlice';
import { getData } from 'redux/thunk/DetailPageThunk';
import { useLocation } from 'react-router-dom';

const DetailPage = () => {
  const detailInfo = useAppSelector(teacherDetail);
  const dispatch = useAppDispatch();
  const local = useLocation();
  const [teacherInfo, setTeacherInfo] = useState<DetailType>({});

  useEffect(() => {
    const currentId: string = local.pathname.slice(1);
    dispatch(getData(currentId));
  }, []);

  useEffect(() => {
    if (detailInfo.status === 'fulfilled') {
      setTeacherInfo(detailInfo.value);
    }
  }, [detailInfo]);

  return (
    <>
      <article className="w-full px-[7.5px] flex flex-col ">
        <TeacherInfo1 teacherInfo={teacherInfo} />
        <TeacherInfo2 teacherInfo={teacherInfo} />
        <RequestBtn />
      </article>
    </>
  );
};

export default DetailPage;
