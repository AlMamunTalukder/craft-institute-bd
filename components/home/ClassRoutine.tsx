import Container from "../shared/Container";

import React from "react";
import SectionTitle from "../shared/SectionTitle";

const ClassRoutine = () => {
  return (
    <Container>
      <div className="border-dashed border-b pb-20 mt-20">
        <SectionTitle text="ক্লাস শিডিউল" />
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-center">
            <thead className="bg-[#4F0187] text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2">ক্লাস</th>
                <th className="border border-gray-300 px-4 py-2">বার</th>
                <th className="border border-gray-300 px-4 py-2">সময়</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              <tr>
                <td className="border border-gray-300 px-4 py-2">মেইন ক্লাস</td>
                <td className="border border-gray-300 px-4 py-2">
                  শনি ও মঙ্গলবার
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  রাত ৯টা থেকে ১১টা
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  প্রব্লেম সলভিং
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  রবি ও বুধবার
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  রাত ৯টা থেকে ১০.৩০মি.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">প্রাক্টিস</td>
                <td className="border border-gray-300 px-4 py-2">
                  সোম ও বৃহস্পতিবার
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  রাত ৯টা থেকে ১০.৩০মি.
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-4 py-2">
                  প্রেজেন্টেশন রিভিউ
                </td>
                <td className="border border-gray-300 px-4 py-2">মঙ্গলবার</td>
                <td className="border border-gray-300 px-4 py-2">
                  মেইন ক্লাসের পর
                </td>
              </tr>
              <tr className="bg-gray-100">
                <td
                  className="border border-gray-300 px-4 py-2 font-semibold text-red-600"
                  colSpan={3}
                >
                  সাপ্তাহিক ছুটিঃ শুক্রবার
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default ClassRoutine;
