import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import userFetcher from "../../src/utils/userFetcher";
import UserCard from "../../src/components/UserCard";

type Props = {};

function Users({}: Props) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users"],
    queryFn: () => userFetcher.getUsers(),
    staleTime: 5000,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex flex-wrap justify-around m-6">
      {data && data.map((user) => <UserCard key={user.id} user={user} />)}
    </div>
  );
}

export default Users;
