import React from 'react';
import { QueryClientProvider, QueryClient, useQuery } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient(); // queryClient 생성

const Main = () => {
  console.log('Main Render!');
  return (
    // Gallery에 QueryClient 제공
    <QueryClientProvider client={queryClient}>
      {/* {console.log('queryClient', queryClient)} */}
      <Gallery />
    </QueryClientProvider>
  );
};

const Gallery = () => {
  console.log('Gallery Render!');
  // useQuery 함수는 data, error, isLoading ....등의 키값을 가진 객체를 반환한다.
  // console.log('useQuery()', useQuery());

  // useQuery함수의 반환값에서 필요한 데이터 구조분해할당으로 초기화
  // const { isLoading, error, data }
  const res = useQuery({
    queryKey: ['repoData'],
    queryFn: () => {
      return axios(
        'https://api.github.com/repos/tannerlinsley/react-query'
      ).then(res => res.data);
      // return fetch(
      //   'https://api.github.com/repos/tannerlinsley/react-query'
      // ).then(res => res.json());
    },
  });
  // console.log('isLoading', isLoading);
  // console.log('error', error);
  // console.log('data', data);
  // console.log('res', res);
  console.log('res.isLoading', res.isLoading);
  if (res.isLoading) return 'Loading...';

  console.log('res.error', res.error);
  if (res.error) return 'An error has occured: ' + res.error.message;

  console.log('res.data', res.data);

  const { data } = res;

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <strong>👀 {data.subscribers_count}</strong>{' '}
      <strong>✨ {data.stargazers_count}</strong>{' '}
      <strong>🍴 {data.forks_count}</strong>
    </div>
  );
};

export default Main;
