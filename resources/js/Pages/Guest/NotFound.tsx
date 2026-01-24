import { Head, Link } from "@inertiajs/react";
import { Button } from "@/Components/ui/button";
import { Home, AlertCircle } from "lucide-react";

export default function NotFound() {
    return (
        <>
            <Head title="Undangan Tidak Ditemukan" />

            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#c4b5a0] to-[#8b7355] px-6">
                <div className="max-w-md w-full text-center">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12">
                        {/* Icon */}
                        <div className="mb-6">
                            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                                <AlertCircle className="w-10 h-10 text-red-600" />
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
                            Undangan Tidak Ditemukan
                        </h1>

                        {/* Message */}
                        <p className="text-gray-600 mb-8 leading-relaxed">
                            Maaf, undangan yang Anda cari tidak ditemukan.
                            Pastikan link yang Anda gunakan sudah benar.
                        </p>

                        {/* Decorative Divider */}
                        <div className="w-16 h-0.5 bg-gray-300 mx-auto mb-8"></div>

                        {/* Additional Info */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <p className="text-sm text-yellow-800">
                                <strong>Tips:</strong> Periksa kembali link
                                undangan yang dikirimkan kepada Anda. Link
                                biasanya dalam format:{" "}
                                <code className="bg-yellow-100 px-2 py-1 rounded text-xs">
                                    /to/nama-anda
                                </code>
                            </p>
                        </div>

                        {/* Action Button */}
                        <Link href="/">
                            <Button className="bg-[#3d2f1f] hover:bg-[#2d1f0f] text-white">
                                <Home className="w-4 h-4 mr-2" />
                                Kembali ke Beranda
                            </Button>
                        </Link>
                    </div>

                    {/* Footer Note */}
                    <p className="mt-6 text-sm text-white/80">
                        Jika Anda yakin ini adalah kesalahan, silakan hubungi
                        penyelenggara acara.
                    </p>
                </div>
            </div>
        </>
    );
}
