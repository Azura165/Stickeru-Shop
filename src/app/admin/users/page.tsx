import AdminUsersClient from "@/components/admin/AdminUsersClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kelola Admin",
};

export default function AdminUsersPage() {
  return <AdminUsersClient />;
}
