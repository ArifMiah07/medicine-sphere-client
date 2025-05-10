'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import Spinner from '@/components/shared/Spinner';

export default function ProfilePage() {
  interface User {
    _id?: string;
    name?: string;
    email?: string;
    role?: string;
    image?: string;
  }

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.email) return;
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/email/${session.user.email}`
        );
        setUser(res.data);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      fetchData();
    } else if (status === 'unauthenticated') {
      setError('You are not logged in.');
      setLoading(false);
    }
  }, [session, status]);

  const handleUpdateProfile = () => {
    if (!user?._id) {
      alert('User ID could not be found.');
      return;
    }
    router.push(`/admin/profile/${user._id}/edit`);
  };

  if (loading) return <div><Spinner /></div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Cover Image */}
      <div className="relative h-64 w-full">
        <Image
          src={`https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
          alt="Cover"
          fill
          className="object-cover"
        />
      </div>

      {/* Profile Section */}
      <div className="relative z-10 -mt-20 flex flex-col sm:flex-row items-center sm:items-end sm:justify-between px-4 sm:px-8">
        {/* Profile Picture */}
        <div className="relative w-40 h-40 border-4 border-white rounded-full overflow-hidden shadow-lg">
          <Image
            src={user?.image || 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'}
            alt="User"
            fill
            className="object-cover"
          />
        </div>

        {/* Info + Button */}
        <div className="mt-4 sm:mt-0 sm:ml-6 text-center sm:text-left flex-1">
          <h1 className="text-2xl font-bold">{user?.name}</h1>
          <p className="text-gray-500">{user?.email}</p>
          <p className="text-sm text-muted-foreground">
            Role: {user?.role || 'User'} | ID: {user?._id || 'Not found'}
          </p>
        </div>

        <div className="mt-4 sm:mt-0">
          <Button onClick={handleUpdateProfile}>Update Profile</Button>
        </div>
      </div>

      {/* Optional Additional Content */}
      <div className="mt-10 px-4 sm:px-8">
        {/* Insert other cards or user-related content here */}
      </div>
    </div>
  );
}
