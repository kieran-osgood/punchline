import React from 'react';

import CenterView from 'components/centerview';
import useGetUserCategories from 'components/useGetUserCategories';
import useGetCategories from 'components/useGetCategories';
import Header from 'components/header';
import JokeSection from 'components/joke-section';

export default function Home() {
  useGetUserCategories();
  useGetCategories();

  return (
    <CenterView>
      <Header />
      <JokeSection />
    </CenterView>
  );
}
