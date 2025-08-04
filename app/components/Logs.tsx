import prisma from "@/lib/prisma";
import React from "react";
import RefreshButton from "./RefreshButton";
import { slugify } from "@/lib/utils";

const getData = async (marketname: string) => {
  const logs = await prisma.syncLog.findMany({
    where: {
      marketplace: {
        slug: slugify(marketname),
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return logs;
};

const Logs = async ({ marketname }: { marketname: string }) => {
  const logs = await getData(marketname);

  return (
    <div className="box max-w-lg mt-4 shadow rounded p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Loglar</h3>
        <RefreshButton />
      </div>

      {logs.length === 0 ? (
        <div className="text-sm text-gray-500">Henüz log yok.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm table-auto border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Tarih</th>
                <th className="p-2 text-left">Action</th>
                <th className="p-2 text-left">Status</th>
                <th className="p-2 text-left">Hata</th>
                <th className="p-2 text-left">Detay</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr
                  key={log.id}
                  className={`border-t ${
                    log.status === "FAILED" ? "bg-red-50" : "bg-white"
                  }`}
                >
                  <td className="p-2">
                    {new Date(log.createdAt).toLocaleString("tr-TR", {
                      hour12: false,
                    })}
                  </td>
                  <td className="p-2">{log.action}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        log.status === "SUCCESS"
                          ? "bg-green-100 text-green-800"
                          : log.status === "PENDING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                  <td className="p-2">{log.errorMessage || "-"}</td>
                  <td className="p-2">
                    <details className="text-xs">
                      <summary className="cursor-pointer">Göster</summary>
                      <div className="mt-1">
                        <div>
                          <strong>Payload:</strong>{" "}
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(log.payload, null, 2)}
                          </pre>
                        </div>
                        <div className="mt-2">
                          <strong>Response:</strong>{" "}
                          <pre className="whitespace-pre-wrap">
                            {JSON.stringify(log.response, null, 2)}
                          </pre>
                        </div>
                      </div>
                    </details>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Logs;
