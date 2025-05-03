import React from 'react';
import DashboardHeader from '../components/CampusAdmin/DashboardHeader';
import FilterBar from '../components/CampusAdmin/FilterBar';
import ItemList from '../components/CampusAdmin/ItemList';
import ItemCard from '../components/CampusAdmin/ItemCard';

export default function AdminDashboard() {
  return (
    <div className="p-6 max-w-7xl mt-10 mx-auto">
      <DashboardHeader />
      <FilterBar />
      <ItemList />
      {/* <ItemCard /> */}
    </div>
  );
}