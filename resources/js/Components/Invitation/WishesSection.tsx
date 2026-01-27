import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { MessageSquare, Send, Trash2, User, Loader2, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { WeddingInfo } from "@/types";
import axios from "axios";

interface Wish {
    id: number;
    guest_id: number | null;
    name: string;
    message: string;
    attendance: string | null;
    created_at: string;
}

interface Props {
    wedding: WeddingInfo;
    guest: {
        id: number;
        name: string;
    };
    isAdmin?: boolean;
}

export default function WishesSection({ wedding, guest, isAdmin = false }: Props) {
    const [wishes, setWishes] = useState<Wish[]>([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const { data, setData, post, processing, reset, errors } = useForm({
        guest_id: guest.id,
        name: guest.name,
        message: "",
        attendance: "",
    });

    const fetchWishes = async (pageNum: number, append = true) => {
        setLoading(true);
        try {
            const response = await axios.get(`/wishes?page=${pageNum}`);
            const newData = response.data.data;
            if (newData.length === 0 || newData.length < 10) {
                setHasMore(false);
            }
            if (append) {
                setWishes((prev) => [...prev, ...newData]);
            } else {
                setWishes(newData);
            }
            setPage(pageNum);
        } catch (error) {
            console.error("Error fetching wishes:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishes(1, false);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/wishes/send", {

            onSuccess: () => {
                reset("message", "attendance");
                fetchWishes(1, false);
                setHasMore(true);
            },

        });
    };

    const handleDelete = async (id: number) => {
        if (confirm("Apakah Anda yakin ingin menghapus ucapan ini?")) {
            try {
                await axios.delete(`/admin/wishes/${id}`);
                setWishes((prev) => prev.filter((w) => w.id !== id));
            } catch (error) {
                alert("Gagal menghapus ucapan.");
            }
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date);
    };

    return (
        <div className="relative w-full py-16 px-6 bg-[#F4F1EA]">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full rotate-180 opacity-20 pointer-events-none">
                <img
                    src="/images/main-top-border.webp"
                    alt=""
                    className="w-full"
                />
            </div>

            <div className="max-w-2xl mx-auto relative z-10">
                <div className="text-center mb-10">
                    <MessageSquare className="w-10 h-10 mx-auto text-[#462e29] mb-4 opacity-70" />
                    <h2 className="text-3xl font-bold font-bali text-[#462e29] mb-2">
                        Ucapan & Doa Restu
                    </h2>
                    <p className="text-[#462e29]/70 italic">
                        Berikan ucapan selamat dan doa restu Anda kepada putra
                        dan putri kami
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm border border-[#462e29]/10 mb-12 space-y-4"
                >
                    <div className="text-center pb-2 border-b border-[#462e29]/10">
                        <span className="text-[#462e29]/60 font-serif italic text-sm">
                            Berikan Ucapan
                        </span>
                    </div>

                    <div>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)} // Tambahkan ini agar bisa diketik
                            placeholder="Nama Anda"
                            className="w-full px-4 py-3 bg-[#fdfaf6] border border-[#462e29]/20 rounded-xl focus:ring-2 focus:ring-[#462e29]/20 focus:outline-none text-[#462e29]" // Hapus cursor-not-allowed & ubah opacity text
                        />
                        {/* Tambahkan ini untuk menampilkan error jika nama kosong */}
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <textarea
                            rows={4}
                            placeholder="Tulis ucapan dan doa Anda di sini..."
                            value={data.message}
                            onChange={(e) => setData("message", e.target.value)}
                            className="w-full px-4 py-3 bg-[#fdfaf6] border border-[#462e29]/20 rounded-xl focus:ring-2 focus:ring-[#462e29]/20 focus:outline-none text-[#462e29]"
                        />
                        {errors.message && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.message}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm font-medium text-[#462e29]/70 ml-1">
                            Konfirmasi Kehadiran
                        </p>
                        <div className="flex gap-4">
                            <label
                                className={`flex-1 flex items-center justify-center gap-2 rounded-xl border transition-all cursor-pointer ${data.attendance === "hadir" ? "bg-[#462e29] border-[#462e29] text-white shadow-md" : "bg-white border-[#462e29]/20 text-[#462e29]/70 hover:bg-[#fdfaf6]"}`}
                            >
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="hadir"
                                    checked={data.attendance === "hadir"}
                                    onChange={(e) =>
                                        setData("attendance", e.target.value)
                                    }
                                    className="hidden"
                                />
                                <CheckCircle
                                    className={`w-4 h-4 ${data.attendance === "hadir" ? "text-white" : "text-green-500"}`}
                                />
                                <span className="font-medium">Hadir</span>
                            </label>
                            <label
                                className={`flex-1 flex items-center justify-center gap-2 px-2 py-1 rounded-xl border transition-all cursor-pointer ${data.attendance === "tidak_hadir" ? "bg-[#462e29] border-[#462e29] text-white shadow-md" : "bg-white border-[#462e29]/20 text-[#462e29]/70 hover:bg-[#fdfaf6]"}`}
                            >
                                <input
                                    type="radio"
                                    name="attendance"
                                    value="tidak_hadir"
                                    checked={data.attendance === "tidak_hadir"}
                                    onChange={(e) =>
                                        setData("attendance", e.target.value)
                                    }
                                    className="hidden"
                                />
                                <XCircle
                                    className={`w-4 h-4 ${data.attendance === "tidak_hadir" ? "text-white" : "text-red-500"}`}
                                />
                                <span className="font-medium">Tidak Hadir</span>
                            </label>
                        </div>
                        {errors.attendance && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.attendance}
                            </p>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <Button
                            type="button"
                            onClick={() => reset("message", "attendance")}
                            variant="outline"
                            className="flex-1 border-[#462e29]/20 text-[#462e29]/70 rounded-xl py-6"
                        >
                            CANCEL
                        </Button>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="flex-1 bg-[#462e29] hover:bg-[#5a3c36] text-white rounded-xl py-6 flex items-center justify-center gap-2"
                        >
                            {processing ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <Send className="w-4 h-4" />
                            )}
                            KIRIM
                        </Button>
                    </div>
                </form>

                <div className="text-[#462e29]/60 font-serif italic text-sm mb-6 pb-2 border-b border-[#462e29]/10">
                    {wishes.length} Ucapan
                </div>

                {/* Wishes List */}
                <div className="space-y-6">
                    {wishes.map((wish) => (
                        <div
                            key={wish.id}
                            className="bg-white p-6 rounded-2xl shadow-sm border border-[#462e29]/5 animate-in fade-in slide-in-from-bottom-2 duration-500"
                        >
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                                    <h4 className="font-bold text-[#462e29]">
                                        {wish.name}
                                    </h4>

                                    {/* Badge Hadir - Style mirip tombol aktif */}
                                    {wish.attendance === "hadir" && (
                                        <span className="inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#462e29] text-white text-xs font-medium shadow-sm">
                                            <CheckCircle className="w-3.5 h-3.5" />
                                            <span>Hadir</span>
                                        </span>
                                    )}

                                    {/* Badge Tidak Hadir - Style badge solid */}
                                    {wish.attendance === "tidak_hadir" && (
                                        <span className="inline-flex w-fit items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#8f3a3a] text-white text-xs font-medium shadow-sm">
                                            <XCircle className="w-3.5 h-3.5" />
                                            <span>Tidak Hadir</span>
                                        </span>
                                    )}
                                </div>

                                {isAdmin && (
                                    <button
                                        onClick={() => handleDelete(wish.id)}
                                        className="text-red-400 hover:text-red-600 p-1.5 -mt-1 -mr-1 transition-colors rounded-full hover:bg-red-50"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            <p className="text-[#462e29]/80 text-sm leading-relaxed whitespace-pre-wrap mb-3">
                                {wish.message}
                            </p>

                            <p className="text-[10px] text-[#462e29]/40 font-medium">
                                <Clock className="inline-block w-3 h-3 mr-1 mb-0.5" />
                                {formatDate(wish.created_at)}
                            </p>
                        </div>
                    ))}

                    {wishes.length === 0 && !loading && (
                        <div className="text-center py-12 opacity-40">
                            <p>Belum ada ucapan.</p>
                        </div>
                    )}

                    {loading && (
                        <div className="flex justify-center py-4">
                            <Loader2 className="w-6 h-6 animate-spin text-[#462e29]/30" />
                        </div>
                    )}

                    {hasMore && !loading && wishes.length > 0 && (
                        <Button
                            variant="outline"
                            onClick={() => fetchWishes(page + 1)}
                            className="w-full border-[#462e29]/20 text-[#462e29]/70 hover:bg-[#fdfaf6] rounded-xl py-6"
                        >
                            Muat Lebih Banyak
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
