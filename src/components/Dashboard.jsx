import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, LineChart, Line, FunnelChart, Funnel, LabelList } from 'recharts';

// Embedded data - School portfolio data
const schoolData = [
  {"Trường": "You Can", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 3525000, "Curriculum": "Hán Ngữ", "TeacherType": "Kết hợp", "CommitmentType": "Học lại miễn phí", "CourseCount": 5, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 63},
  {"Trường": "Hoa ngữ quốc tế CGE", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 7186666, "Avg_Offline": 3080000, "Curriculum": "HSK chuẩn", "TeacherType": "Việt Nam", "CommitmentType": "Học lại miễn phí", "CourseCount": 6, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 60},
  {"Trường": "Ngoại ngữ Tầm Nhìn Việt", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "Hán Ngữ", "TeacherType": "Bản xứ", "CommitmentType": "Học lại miễn phí", "CourseCount": 1, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 60},
  {"Trường": "Trung Tâm Ngoại Ngữ Tiếng Trung Ôn Ngọc Là Bạn", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 9635000, "Avg_Offline": 6375000, "Curriculum": "HSK chuẩn", "TeacherType": "Việt Nam", "CommitmentType": "Học lại miễn phí", "CourseCount": 5, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 60},
  {"Trường": "CGE-Hoa Ngữ Quốc Tế", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 1, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 11413333, "Avg_Offline": 17920000, "Curriculum": "HSK chuẩn", "TeacherType": "Việt Nam", "CommitmentType": "Học lại miễn phí", "CourseCount": 4, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 58},
  {"Trường": "TRUNG TÂM HOA NGỮ HOA LẠC", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 1, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2666666, "Curriculum": "HSK chuẩn", "TeacherType": "Kết hợp", "CommitmentType": "Có cam kết", "CourseCount": 4, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 58},
  {"Trường": "TIẾNG TRUNG HOÀI NGÔ THỦ ĐỨC", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 4700000, "Avg_Offline": 6500000, "Curriculum": "Hán Ngữ", "TeacherType": "Kết hợp", "CommitmentType": "Có cam kết", "CourseCount": 3, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 54},
  {"Trường": "Trung Tâm Tiếng Trung HD", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2400000, "Curriculum": "HSK chuẩn", "TeacherType": "Việt Nam", "CommitmentType": "Học lại miễn phí", "CourseCount": 2, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 54},
  {"Trường": "Ni Hao Ma Mandarin Learning Lab", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 26100000, "Avg_Offline": 30000000, "Curriculum": "Unknown", "TeacherType": "Bản xứ", "CommitmentType": "Có cam kết", "CourseCount": 4, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 53},
  {"Trường": "Trung tâm Ngoại ngữ EVERGREEN", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 3000000, "Curriculum": "Hán Ngữ", "TeacherType": "Bản xứ", "CommitmentType": "Không đề cập", "CourseCount": 6, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 53},
  {"Trường": "HOA NGỮ NHÂN TÂM", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 2733333, "Avg_Offline": 0, "Curriculum": "HSK chuẩn", "TeacherType": "Việt Nam", "CommitmentType": "Có cam kết", "CourseCount": 3, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 51},
  {"Trường": "KAI Center", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 7700000, "Avg_Offline": 0, "Curriculum": "Hán Ngữ", "TeacherType": "Bản xứ", "CommitmentType": "Không cam kết", "CourseCount": 4, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 51},
  {"Trường": "Hán ngữ Trần Kiến", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 5700000, "Curriculum": "HSK chuẩn", "TeacherType": "Kết hợp", "CommitmentType": "Không đề cập", "CourseCount": 6, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 50},
  {"Trường": "Newsky", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 15000000, "Avg_Offline": 3295000, "Curriculum": "Unknown", "TeacherType": "Kết hợp", "CommitmentType": "Có cam kết", "CourseCount": 5, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 50},
  {"Trường": "Hoa ngữ phi thành", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2900000, "Curriculum": "Hán Ngữ", "TeacherType": "Việt Nam", "CommitmentType": "Có cam kết", "CourseCount": 3, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 49},
  {"Trường": "Hoa Ngữ Thành Nhân", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 900000, "Avg_Offline": 2500000, "Curriculum": "Hán Ngữ", "TeacherType": "Việt Nam", "CommitmentType": "Có cam kết", "CourseCount": 3, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 49},
  {"Trường": "Solf", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 1, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 8818000, "Avg_Offline": 300000, "Curriculum": "Hán Ngữ", "TeacherType": "Việt Nam", "CommitmentType": "Có cam kết", "CourseCount": 3, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 49},
  {"Trường": "Trung tâm Ngoại ngữ Hoa Thành", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "HSK chuẩn", "TeacherType": "Bản xứ", "CommitmentType": "Không đề cập", "CourseCount": 2, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 49},
  {"Trường": "Tiếng Trung Ni Hao", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 5860000, "Curriculum": "Hán Ngữ", "TeacherType": "Kết hợp", "CommitmentType": "Không cam kết", "CourseCount": 5, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 48},
  {"Trường": "Tiếng Trung THANHMAIHSK", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 7600000, "Avg_Offline": 0, "Curriculum": "Hán Ngữ", "TeacherType": "Việt Nam", "CommitmentType": "Có cam kết", "CourseCount": 2, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 47},
  {"Trường": "Trung Tâm Hoa Văn Cát Nhiên", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "HSK chuẩn", "TeacherType": "Việt Nam", "CommitmentType": "Có cam kết", "CourseCount": 1, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 47},
  {"Trường": "Hoa ngữ & Tin Học Triều Châu", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 4166666, "Curriculum": "Unknown", "TeacherType": "Việt Nam", "CommitmentType": "Học lại miễn phí", "CourseCount": 3, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 46},
  {"Trường": "iChinese", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 3323333, "Avg_Offline": 2590000, "Curriculum": "Tự biên soạn", "TeacherType": "Việt Nam", "CommitmentType": "Học lại miễn phí", "CourseCount": 3, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 46},
  {"Trường": "HOA NGỮ ĐẮC NHÂN", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 1, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 3855000, "Avg_Offline": 0, "Curriculum": "Tự biên soạn", "TeacherType": "Việt Nam", "CommitmentType": "Có cam kết", "CourseCount": 5, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 45},
  {"Trường": "Tiếng Trung Mỗi Ngày", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 1, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "Tự biên soạn", "TeacherType": "Việt Nam", "CommitmentType": "Có cam kết", "CourseCount": 5, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 45},
  {"Trường": "Hoa Ngữ Anh Đào", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 1925000, "Curriculum": "HSK chuẩn", "TeacherType": "Việt Nam", "CommitmentType": "Không đề cập", "CourseCount": 4, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 43},
  {"Trường": "Hoa ngữ phong vân", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 3125000, "Curriculum": "HSK chuẩn", "TeacherType": "Việt Nam", "CommitmentType": "Không cam kết", "CourseCount": 4, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 43},
  {"Trường": "Hoa ngữ Vương Gia", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 3787500, "Curriculum": "HSK chuẩn", "TeacherType": "Việt Nam", "CommitmentType": "Không đề cập", "CourseCount": 4, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 43},
  {"Trường": "Tiếng Trung Xin Chào", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 3692500, "Curriculum": "Unknown", "TeacherType": "Việt Nam", "CommitmentType": "Có cam kết", "CourseCount": 4, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 43},
  {"Trường": "Trung tâm tiếng Trung Hoa văn SaigonHSK", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2980000, "Curriculum": "Unknown", "TeacherType": "Việt Nam", "CommitmentType": "Có cam kết", "CourseCount": 4, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 43},
  {"Trường": "Tiếng Trung Amei Thủ Đức", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "HSK chuẩn", "TeacherType": "Kết hợp", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 42},
  {"Trường": "Tiếng Trung Musan", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "Hán Ngữ", "TeacherType": "Kết hợp", "CommitmentType": "Không đề cập", "CourseCount": 2, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 42},
  {"Trường": "ChineseHSK", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 3000000, "Curriculum": "HSK chuẩn", "TeacherType": "Việt Nam", "CommitmentType": "Không cam kết", "CourseCount": 3, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 41},
  {"Trường": "Hoa ngữ 51", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2950000, "Curriculum": "HSK chuẩn", "TeacherType": "Việt Nam", "CommitmentType": "Không đề cập", "CourseCount": 3, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 41},
  {"Trường": "Hoa Ngữ Gia Hân", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 3633333, "Curriculum": "Tự biên soạn", "TeacherType": "Việt Nam", "CommitmentType": "Có cam kết", "CourseCount": 3, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 41},
  {"Trường": "TRUNG TÂM HOA NGỮ THỪA YẾN", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 4800000, "Curriculum": "HSK chuẩn", "TeacherType": "Việt Nam", "CommitmentType": "Không cam kết", "CourseCount": 3, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 41},
  {"Trường": "Hoa Ngữ Những Người Bạn", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 3300000, "Avg_Offline": 0, "Curriculum": "Hán Ngữ", "TeacherType": "Việt Nam", "CommitmentType": "Không cam kết", "CourseCount": 3, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 39},
  {"Trường": "Tiếng Hoa Vi Vi _ Dầu Tiếng", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2600000, "Curriculum": "Unknown", "TeacherType": "Bản xứ", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 37},
  {"Trường": "Tiếng Trung Sao Việt", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2600000, "Curriculum": "Unknown", "TeacherType": "Bản xứ", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 37},
  {"Trường": "Trung Tâm Dạy Tiếng Trung Sao Việt Bình Dương", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2600000, "Curriculum": "Unknown", "TeacherType": "Bản xứ", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 37},
  {"Trường": "Trung tâm đào tạo Hoa ngữ - TIẾNG TRUNG PHIÊN DỊCH", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2000000, "Curriculum": "Unknown", "TeacherType": "Bản xứ", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 37},
  {"Trường": "Trung tâm Tiếng Trung KAT Education", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 3900000, "Curriculum": "Unknown", "TeacherType": "Bản xứ", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 37},
  {"Trường": "TRUNG TÂM TIẾNG TRUNG TƯƠNG LAI", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2700000, "Curriculum": "Unknown", "TeacherType": "Bản xứ", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 37},
  {"Trường": "MLS", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 9360000, "Curriculum": "Unknown", "TeacherType": "Kết hợp", "CommitmentType": "Không đề cập", "CourseCount": 3, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 36},
  {"Trường": "Hoa Ngữ KHẢ HÂN - Tiếng Trung Văn Phòng Công xưởng", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2700000, "Curriculum": "Unknown", "TeacherType": "Kết hợp", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 32},
  {"Trường": "Tiếng Trung DEYSI", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2060000, "Curriculum": "Unknown", "TeacherType": "Kết hợp", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 32},
  {"Trường": "TIẾNG TRUNG KIM OANH - DĨ AN", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 6270000, "Curriculum": "Unknown", "TeacherType": "Kết hợp", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 32},
  {"Trường": "Tiếng Trung Mộc Mộc", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 2600000, "Avg_Offline": 0, "Curriculum": "Unknown", "TeacherType": "Kết hợp", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 32},
  {"Trường": "HOA NGỮ NHẤT TÂM - TIẾNG TRUNG BÌNH THẠNH", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 2816666, "Avg_Offline": 0, "Curriculum": "Tự biên soạn", "TeacherType": "Việt Nam", "CommitmentType": "Không đề cập", "CourseCount": 3, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 31},
  {"Trường": "Trung tâm tiếng hoa hội nghĩa", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 3000000, "Curriculum": "Unknown", "TeacherType": "Việt Nam", "CommitmentType": "Không cam kết", "CourseCount": 3, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 31},
  {"Trường": "TIẾNG HOA FT 365 (365华语中心)", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2616000, "Curriculum": "Unknown", "TeacherType": "Việt Nam", "CommitmentType": "Không đề cập", "CourseCount": 2, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 29},
  {"Trường": "HOA NGỮ HỘI VIỆT HOA", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "Unknown", "TeacherType": "Việt Nam", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 27},
  {"Trường": "Hoa Ngữ Kim Trang", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "Unknown", "TeacherType": "Việt Nam", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 27},
  {"Trường": "Hoa Ngữ L.H(中文---越文学习).CHINESE", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 1, "Avg_Online": 2000000, "Avg_Offline": 0, "Curriculum": "Unknown", "TeacherType": "Việt Nam", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 27},
  {"Trường": "Hoa Ngữ Lê Trường", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 2100000, "Avg_Offline": 0, "Curriculum": "Unknown", "TeacherType": "Việt Nam", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 27},
  {"Trường": "TIẾNG TRUNG ANNA BÀU BÀNG", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "Unknown", "TeacherType": "Việt Nam", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 27},
  {"Trường": "Tiếng Trung Đông Nam Bộ - Bến Cát", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 650000, "Curriculum": "Unknown", "TeacherType": "Việt Nam", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 27},
  {"Trường": "Tiếng Trung Hoài Ngô Bình Dương", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "Unknown", "TeacherType": "Việt Nam", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 27},
  {"Trường": "Trung Tâm Tiếng Trung Đông Phương - Tiếng Trung Thủ Đức HCM", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2400000, "Curriculum": "Hán Ngữ", "TeacherType": "Unknown", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 25},
  {"Trường": "Gia Sư Tiếng Trung Gia Huy 嘉辉中越英文家教", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 6000000, "Avg_Offline": 0, "Curriculum": "Unknown", "TeacherType": "Unknown", "CommitmentType": "Không đề cập", "CourseCount": 2, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 19},
  {"Trường": "Hoa Ngữ Ánh Dương HSK", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2800000, "Curriculum": "Unknown", "TeacherType": "Unknown", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 17},
  {"Trường": "Hoa Ngữ Đại Bảo 大宝华语培训中心", "Has_HSK_CoBan": 1, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "Unknown", "TeacherType": "Unknown", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 1, "DiversityScore": 1, "PortfolioStrategy": "HSK-Specialist", "TotalScore": 17},
  {"Trường": "RISE Chinese & English Language Centre", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "Unknown", "TeacherType": "Unknown", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 17},
  {"Trường": "Tiếng Hoa cô Ruãn (阮）", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "Unknown", "TeacherType": "Unknown", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 17},
  {"Trường": "Tiếng Trung Kim Tứ Gia", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 800000, "Curriculum": "Unknown", "TeacherType": "Unknown", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 17},
  {"Trường": "TIẾNG TRUNG THẦY CHEN", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 0, "Curriculum": "Unknown", "TeacherType": "Unknown", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 17},
  {"Trường": "Trung Tâm Đào Tạo Tiếng Trung Thầy Hiên", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 2900000, "Curriculum": "Unknown", "TeacherType": "Unknown", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 17},
  {"Trường": "TRUNG TÂM HOA VĂN LỄ VĂN", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 1950000, "Curriculum": "Unknown", "TeacherType": "Unknown", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 17},
  {"Trường": "Trung Tâm Tiếng Trung Hoa Việt", "Has_HSK_CoBan": 0, "Has_HSK_Cao": 0, "Has_GiaoTiep": 0, "Has_ThieuNhi": 0, "Has_ChuyenNganh": 0, "Has_Intensive": 0, "Avg_Online": 0, "Avg_Offline": 700000, "Curriculum": "Unknown", "TeacherType": "Unknown", "CommitmentType": "Không đề cập", "CourseCount": 1, "Has_HSK": 0, "DiversityScore": 1, "PortfolioStrategy": "Other", "TotalScore": 17}
];

// Total: 69 schools
// Sorted by TotalScore (descending);

// COURSE DISTRIBUTION DATA (from 171 courses analysis)
const courseDistributionData = [
  { name: 'HSK 1', count: 38, percent: 22.2, color: '#C41E3A' },
  { name: 'HSK 3', count: 38, percent: 22.2, color: '#E85A71' },
  { name: 'HSK 2', count: 30, percent: 17.5, color: '#FF8C94' },
  { name: 'HSK Cơ bản (chung)', count: 23, percent: 13.5, color: '#FFB6C1' },
  { name: 'HSK Cao cấp (4-6)', count: 20, percent: 11.7, color: '#1E3A5F' },
  { name: 'Kids/YCT', count: 9, percent: 5.3, color: '#FFD700' },
  { name: 'Giao tiếp', count: 9, percent: 5.3, color: '#2D5A27' },
  { name: '1:1/Intensive', count: 1, percent: 0.6, color: '#E8A317' },
  { name: 'Khác', count: 3, percent: 1.8, color: '#999' },
];

const levelGroupData = [
  { name: 'HSK Sơ-Trung cấp (1-3)', value: 129, percent: 75.4, fill: '#C41E3A' },
  { name: 'HSK Cao cấp (4-6)', value: 20, percent: 11.7, fill: '#1E3A5F' },
  { name: 'Kids/YCT', value: 9, percent: 5.3, fill: '#FFD700' },
  { name: 'Giao tiếp', value: 9, percent: 5.3, fill: '#2D5A27' },
  { name: 'Khác', value: 4, percent: 2.3, fill: '#999' },
];

const hskFunnelData = [
  { name: 'HSK 1', value: 38, fill: '#C41E3A' },
  { name: 'HSK 2', value: 30, fill: '#E85A71' },
  { name: 'HSK 3', value: 38, fill: '#FF8C94' },
  { name: 'HSK 4', value: 3, fill: '#1E3A5F' },
  { name: 'HSK 5', value: 1, fill: '#2D5A27' },
  { name: 'HSK 6', value: 0, fill: '#999' },
];

const priceByTypeData = [
  { name: 'HSK Cao (4-6)', avgPrice: 8461000, median: 5100000 },
  { name: 'HSK 3', avgPrice: 5434118, median: 3500000 },
  { name: 'HSK 2', avgPrice: 4579412, median: 3000000 },
  { name: 'HSK 1', avgPrice: 4240842, median: 2980000 },
  { name: 'Kids/YCT', avgPrice: 3772500, median: 3935000 },
  { name: 'Giao tiếp', avgPrice: 3162500, median: 2480000 },
];

const gapAnalysisData = [
  { name: 'Business Chinese', current: 0, potential: 85, gap: 85 },
  { name: 'HSKK (Speaking)', current: 0, potential: 70, gap: 70 },
  { name: 'Translation', current: 0, potential: 50, gap: 50 },
  { name: 'Intensive Bootcamp', current: 1, potential: 60, gap: 59 },
  { name: 'HSK 5-6', current: 1, potential: 40, gap: 39 },
];

// Color palette - Chinese-inspired
const COLORS = {
  primary: '#C41E3A',
  secondary: '#FFD700',
  accent: '#1E3A5F',
  success: '#2D5A27',
  warning: '#E8A317',
  neutral: '#4A4A4A',
  light: '#F5F0E6',
  dark: '#1A1A2E',
};

const CHART_COLORS = ['#C41E3A', '#FFD700', '#1E3A5F', '#2D5A27', '#E8A317', '#8B4513', '#4A90D9', '#E85A71', '#FF8C94'];

const formatCurrency = (value) => {
  if (!value || value === 0) return '-';
  return new Intl.NumberFormat('vi-VN', { style: 'decimal', maximumFractionDigits: 0 }).format(value) + 'đ';
};

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [filters, setFilters] = useState({
    portfolio: 'all',
    diversity: 'all', 
    teacher: 'all',
    commitment: 'all',
  });
  const [sortConfig, setSortConfig] = useState({ key: 'TotalScore', direction: 'desc' });
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = useMemo(() => {
    let result = [...schoolData];
    if (searchTerm) result = result.filter(s => s.Trường.toLowerCase().includes(searchTerm.toLowerCase()));
    if (filters.portfolio !== 'all') result = result.filter(s => s.PortfolioStrategy === filters.portfolio);
    if (filters.diversity !== 'all') {
      const div = parseInt(filters.diversity);
      result = div === 3 ? result.filter(s => s.DiversityScore >= 3) : result.filter(s => s.DiversityScore === div);
    }
    if (filters.teacher !== 'all') result = result.filter(s => s.TeacherType === filters.teacher);
    if (filters.commitment !== 'all') result = result.filter(s => s.CommitmentType === filters.commitment);
    result.sort((a, b) => {
      const aVal = a[sortConfig.key] || 0;
      const bVal = b[sortConfig.key] || 0;
      return sortConfig.direction === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
    return result;
  }, [filters, sortConfig, searchTerm]);

  const stats = useMemo(() => ({
    totalSchools: schoolData.length,
    hskOnly: schoolData.filter(s => s.Has_HSK === 1 && s.Has_GiaoTiep === 0).length,
    giaotiepOnly: schoolData.filter(s => s.Has_HSK === 0 && s.Has_GiaoTiep === 1).length,
    hybrid: schoolData.filter(s => s.Has_HSK === 1 && s.Has_GiaoTiep === 1).length,
    hasThieuNhi: schoolData.filter(s => s.Has_ThieuNhi === 1).length,
    hasChuyenNganh: schoolData.filter(s => s.Has_ChuyenNganh === 1).length,
    avgPrice: schoolData.filter(s => s.Avg_Offline > 0).reduce((a, b) => a + b.Avg_Offline, 0) / schoolData.filter(s => s.Avg_Offline > 0).length,
  }), []);

  const portfolioChartData = useMemo(() => {
    const counts = {};
    schoolData.forEach(s => { counts[s.PortfolioStrategy] = (counts[s.PortfolioStrategy] || 0) + 1; });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const diversityChartData = useMemo(() => [
    { name: '1 loại', value: schoolData.filter(s => s.DiversityScore === 1).length },
    { name: '2 loại', value: schoolData.filter(s => s.DiversityScore === 2).length },
    { name: '3+ loại', value: schoolData.filter(s => s.DiversityScore >= 3).length },
  ], []);

  const teacherChartData = useMemo(() => {
    const counts = {};
    schoolData.forEach(s => {
      if (s.TeacherType && s.TeacherType !== 'Unknown') counts[s.TeacherType] = (counts[s.TeacherType] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const top5 = useMemo(() => [...schoolData].sort((a, b) => b.TotalScore - a.TotalScore).slice(0, 5), []);

  const handleSort = (key) => {
    setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc' }));
  };

  return (
    <div style={{ 
      minHeight: '100vh',
      background: `linear-gradient(135deg, ${COLORS.light} 0%, #fff 50%, ${COLORS.light} 100%)`,
      fontFamily: "'Noto Sans SC', 'Be Vietnam Pro', system-ui, sans-serif",
      color: COLORS.dark,
    }}>
      {/* Header */}
      <header style={{
        background: `linear-gradient(135deg, ${COLORS.primary} 0%, #8B0000 100%)`,
        color: 'white',
        padding: '24px 32px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 36 }}>中</span>
            Phân Tích Thị Trường Đào Tạo Tiếng Trung
          </h1>
          <p style={{ margin: '8px 0 0', opacity: 0.9, fontSize: 14 }}>
            Dashboard khảo sát {stats.totalSchools} trung tâm, 171 khóa học | Dữ liệu định lượng + định tính
          </p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav style={{
        background: 'white',
        borderBottom: `3px solid ${COLORS.primary}`,
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 0, flexWrap: 'wrap' }}>
          {[
            { id: 'overview', label: '📊 Tổng quan' },
            { id: 'courses', label: '📈 Phân bổ Khóa học' },
            { id: 'portfolio', label: '📦 Portfolio Analysis' },
            { id: 'competitors', label: '🏆 Top Đối thủ' },
            { id: 'data', label: '📋 Dữ liệu chi tiết' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 20px',
                border: 'none',
                background: activeTab === tab.id ? COLORS.primary : 'transparent',
                color: activeTab === tab.id ? 'white' : COLORS.dark,
                fontWeight: 600,
                fontSize: 14,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main style={{ maxWidth: 1400, margin: '0 auto', padding: '24px 32px' }}>
        
        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'Tổng trung tâm', value: stats.totalSchools, color: COLORS.primary },
                { label: 'HSK-only', value: `${stats.hskOnly} (${(stats.hskOnly/stats.totalSchools*100).toFixed(0)}%)`, color: COLORS.accent },
                { label: 'Giao tiếp-only', value: `${stats.giaotiepOnly} (${(stats.giaotiepOnly/stats.totalSchools*100).toFixed(0)}%)`, color: COLORS.success },
                { label: 'Hybrid (HSK+GT)', value: `${stats.hybrid} (${(stats.hybrid/stats.totalSchools*100).toFixed(0)}%)`, color: COLORS.secondary },
                { label: 'Có Thiếu nhi', value: `${stats.hasThieuNhi} (${(stats.hasThieuNhi/stats.totalSchools*100).toFixed(0)}%)`, color: COLORS.warning },
                { label: 'Có Chuyên ngành', value: `${stats.hasChuyenNganh} (0%)`, color: '#999' },
              ].map((metric, i) => (
                <div key={i} style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', borderLeft: `4px solid ${metric.color}` }}>
                  <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>{metric.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: metric.color }}>{metric.value}</div>
                </div>
              ))}
            </div>

            <div style={{ background: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}15)`, border: `2px solid ${COLORS.primary}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
              <h3 style={{ margin: '0 0 16px', color: COLORS.primary, display: 'flex', alignItems: 'center', gap: 8 }}>🔴 Critical Market Gaps</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                <div style={{ background: 'white', padding: 16, borderRadius: 8 }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.primary }}>81.2%</div>
                  <div style={{ color: '#666' }}>Trung tâm chỉ có HSK, không có Giao tiếp</div>
                </div>
                <div style={{ background: 'white', padding: 16, borderRadius: 8 }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.primary }}>0%</div>
                  <div style={{ color: '#666' }}>Trung tâm có khóa Tiếng Trung Thương mại</div>
                </div>
                <div style={{ background: 'white', padding: 16, borderRadius: 8 }}>
                  <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.primary }}>2.9%</div>
                  <div style={{ color: '#666' }}>Trung tâm có Hybrid Model (HSK + Giao tiếp)</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Chiến lược Portfolio</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie data={portfolioChartData} cx="50%" cy="50%" outerRadius={100} dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                      {portfolioChartData.map((_, index) => (<Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Độ đa dạng khóa học</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={diversityChartData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={80} />
                    <Tooltip />
                    <Bar dataKey="value" fill={COLORS.primary} radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* COURSES TAB - NEW */}
        {activeTab === 'courses' && (
          <div>
            {/* Key metrics */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'Tổng khóa học', value: '171', sub: '69 trung tâm', color: COLORS.primary },
                { label: 'HSK (1-6)', value: '149', sub: '87.1%', color: COLORS.accent },
                { label: 'HSK Sơ-Trung (1-3)', value: '129', sub: '75.4%', color: '#E85A71' },
                { label: 'HSK Cao (4-6)', value: '20', sub: '11.7%', color: '#1E3A5F' },
                { label: 'Giao tiếp', value: '9', sub: '5.3%', color: COLORS.success },
                { label: 'Kids/YCT', value: '9', sub: '5.3%', color: COLORS.secondary },
              ].map((m, i) => (
                <div key={i} style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', borderTop: `4px solid ${m.color}` }}>
                  <div style={{ color: '#666', fontSize: 12, marginBottom: 4 }}>{m.label}</div>
                  <div style={{ fontSize: 28, fontWeight: 700, color: m.color }}>{m.value}</div>
                  <div style={{ color: '#999', fontSize: 12 }}>{m.sub}</div>
                </div>
              ))}
            </div>

            {/* Insight box */}
            <div style={{ background: `linear-gradient(135deg, ${COLORS.accent}15, ${COLORS.primary}15)`, border: `2px solid ${COLORS.accent}`, borderRadius: 12, padding: 24, marginBottom: 32 }}>
              <h3 style={{ margin: '0 0 12px', color: COLORS.accent }}>🎯 Insight chính: Thị trường "Entry-heavy, HSK-centric"</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
                <div style={{ background: 'white', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.primary }}>6.5 : 1</div>
                  <div style={{ color: '#666', fontSize: 13 }}>Tỷ lệ HSK Cơ bản : HSK Cao</div>
                </div>
                <div style={{ background: 'white', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 700, color: '#C41E3A' }}>92%</div>
                  <div style={{ color: '#666', fontSize: 13 }}>Drop-off sau HSK 3</div>
                </div>
                <div style={{ background: 'white', padding: 16, borderRadius: 8, textAlign: 'center' }}>
                  <div style={{ fontSize: 36, fontWeight: 700, color: COLORS.success }}>0%</div>
                  <div style={{ color: '#666', fontSize: 13 }}>Business Chinese, HSKK</div>
                </div>
              </div>
            </div>

            {/* Charts row 1 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              {/* Course Distribution Bar Chart */}
              <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Phân bổ theo loại khóa học</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <BarChart data={courseDistributionData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="name" width={120} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => [`${v} khóa`, 'Số lượng']} />
                    <Bar dataKey="count" radius={[0, 8, 8, 0]}>
                      {courseDistributionData.map((entry, index) => (
                        <Cell key={index} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Level Group Pie */}
              <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Phân nhóm theo cấp độ</h3>
                <ResponsiveContainer width="100%" height={320}>
                  <PieChart>
                    <Pie data={levelGroupData} cx="50%" cy="50%" outerRadius={110} dataKey="value" label={({ name, percent }) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}>
                      {levelGroupData.map((entry, index) => (<Cell key={index} fill={entry.fill} />))}
                    </Pie>
                    <Tooltip formatter={(v, n, p) => [`${v} khóa (${p.payload.percent}%)`, p.payload.name]} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Charts row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
              {/* HSK Funnel */}
              <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 8px', color: COLORS.dark }}>HSK Funnel - Hành trình học viên</h3>
                <p style={{ margin: '0 0 16px', color: '#666', fontSize: 13 }}>Số khóa học theo cấp độ HSK → thể hiện drop-off rate</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={hskFunnelData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(v) => [`${v} khóa`, 'Số lượng']} />
                    <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                      {hskFunnelData.map((entry, index) => (<Cell key={index} fill={entry.fill} />))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
                <div style={{ marginTop: 16, padding: 12, background: '#FFF3CD', borderRadius: 8, fontSize: 13 }}>
                  <strong>⚠️ Cliff Drop:</strong> HSK 3 (38 khóa) → HSK 4 (3 khóa) = <strong style={{ color: COLORS.primary }}>92% rơi rụng</strong>
                </div>
              </div>

              {/* Price by Course Type */}
              <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 8px', color: COLORS.dark }}>Học phí trung bình theo loại khóa (Offline)</h3>
                <p style={{ margin: '0 0 16px', color: '#666', fontSize: 13 }}>So sánh giá trung bình vs median</p>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={priceByTypeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" tickFormatter={(v) => `${(v/1000000).toFixed(1)}M`} />
                    <YAxis type="category" dataKey="name" width={100} tick={{ fontSize: 12 }} />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Legend />
                    <Bar dataKey="avgPrice" fill={COLORS.primary} name="Trung bình" radius={[0, 4, 4, 0]} />
                    <Bar dataKey="median" fill={COLORS.secondary} name="Median" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gap Analysis */}
            <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <h3 style={{ margin: '0 0 8px', color: COLORS.dark }}>🚨 Gap Analysis - Khóa học chưa được khai thác</h3>
              <p style={{ margin: '0 0 20px', color: '#666', fontSize: 13 }}>So sánh nguồn cung hiện tại vs tiềm năng thị trường (ước tính)</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 16 }}>
                {gapAnalysisData.map((item, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: 16, background: i === 0 ? `${COLORS.primary}10` : '#f9f9f9', borderRadius: 12, border: i === 0 ? `2px solid ${COLORS.primary}` : '1px solid #eee' }}>
                    <div style={{ fontSize: 11, color: '#666', marginBottom: 8 }}>{item.name}</div>
                    <div style={{ fontSize: 32, fontWeight: 700, color: item.current === 0 ? COLORS.primary : COLORS.accent }}>{item.current}</div>
                    <div style={{ fontSize: 11, color: '#999' }}>khóa hiện tại</div>
                    <div style={{ marginTop: 8, padding: '4px 8px', background: COLORS.primary, color: 'white', borderRadius: 4, fontSize: 11 }}>
                      Gap: {item.gap}%
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, padding: 16, background: `linear-gradient(135deg, ${COLORS.success}15, ${COLORS.secondary}15)`, borderRadius: 8, border: `1px solid ${COLORS.success}` }}>
                <h4 style={{ margin: '0 0 8px', color: COLORS.success }}>💡 Cơ hội Blue Ocean cho SHZ</h4>
                <ul style={{ margin: 0, paddingLeft: 20, color: '#444', fontSize: 14, lineHeight: 1.8 }}>
                  <li><strong>Business Chinese:</strong> 0% cung ứng, VN-China trade $175B+/năm</li>
                  <li><strong>HSKK (Speaking):</strong> 0% cung ứng, nhu cầu cao từ du học sinh</li>
                  <li><strong>HSK 4-6:</strong> Premium pricing (~8.5M), ít cạnh tranh</li>
                  <li><strong>Intensive Bootcamp:</strong> Chỉ 0.6% thị trường, margin cao</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <div>
            <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 24 }}>
              <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Ma trận Portfolio Strategy</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
                {[
                  { strategy: 'HSK-Specialist', count: schoolData.filter(s => s.PortfolioStrategy === 'HSK-Specialist').length, desc: 'Chỉ có HSK, không giao tiếp', color: COLORS.accent },
                  { strategy: 'Communication-Focused', count: schoolData.filter(s => s.PortfolioStrategy === 'Communication-Focused').length, desc: 'Chỉ giao tiếp, không HSK', color: COLORS.success },
                  { strategy: 'Hybrid', count: schoolData.filter(s => s.PortfolioStrategy === 'Hybrid').length, desc: 'HSK + Giao tiếp', color: COLORS.secondary },
                  { strategy: 'Full-Service', count: schoolData.filter(s => s.PortfolioStrategy === 'Full-Service').length, desc: '3+ loại khóa học', color: COLORS.primary },
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: 'center', padding: 20, background: `${item.color}10`, borderRadius: 12, border: `2px solid ${item.color}` }}>
                    <div style={{ fontSize: 36, fontWeight: 700, color: item.color }}>{item.count}</div>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>{item.strategy}</div>
                    <div style={{ fontSize: 12, color: '#666' }}>{item.desc}</div>
                    <div style={{ marginTop: 8, fontSize: 12, color: item.color }}>{((item.count/stats.totalSchools)*100).toFixed(1)}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Phân bố Giáo viên</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={teacherChartData} cx="50%" cy="50%" outerRadius={90} dataKey="value" label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}>
                      {teacherChartData.map((_, index) => (<Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Price vs Diversity</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <ScatterChart>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="DiversityScore" name="Đa dạng" type="number" domain={[0, 4]} />
                    <YAxis dataKey="Avg_Offline" name="Học phí" tickFormatter={(v) => `${(v/1000000).toFixed(0)}M`} />
                    <ZAxis dataKey="TotalScore" range={[50, 400]} name="Điểm" />
                    <Tooltip formatter={(v, n) => n === 'Học phí' ? formatCurrency(v) : v} />
                    <Scatter data={schoolData.filter(s => s.Avg_Offline > 0)} fill={COLORS.primary} />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* COMPETITORS TAB */}
        {activeTab === 'competitors' && (
          <div>
            <h2 style={{ margin: '0 0 24px', color: COLORS.dark }}>🏆 Top 5 Đối thủ cạnh tranh</h2>
            <div style={{ display: 'grid', gap: 20 }}>
              {top5.map((school, index) => (
                <div key={index} style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', borderLeft: `5px solid ${index === 0 ? COLORS.secondary : COLORS.primary}`, position: 'relative' }}>
                  <div style={{ position: 'absolute', top: -10, left: 20, background: index === 0 ? COLORS.secondary : COLORS.primary, color: index === 0 ? COLORS.dark : 'white', padding: '4px 16px', borderRadius: 20, fontWeight: 700, fontSize: 14 }}>
                    #{index + 1}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 8 }}>
                    <div>
                      <h3 style={{ margin: '0 0 8px', fontSize: 20 }}>{school.Trường}</h3>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                        <span style={{ padding: '4px 12px', background: `${COLORS.accent}20`, borderRadius: 20, fontSize: 12 }}>{school.PortfolioStrategy}</span>
                        <span style={{ padding: '4px 12px', background: `${COLORS.success}20`, borderRadius: 20, fontSize: 12 }}>{school.TeacherType}</span>
                        <span style={{ padding: '4px 12px', background: `${COLORS.warning}20`, borderRadius: 20, fontSize: 12 }}>{school.CommitmentType}</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, fontSize: 13 }}>
                        <div><span style={{ color: '#666' }}>Đa dạng:</span> <strong>{school.DiversityScore} loại</strong></div>
                        <div><span style={{ color: '#666' }}>Số khóa:</span> <strong>{school.CourseCount}</strong></div>
                        <div><span style={{ color: '#666' }}>Giáo trình:</span> <strong>{school.Curriculum}</strong></div>
                        <div><span style={{ color: '#666' }}>Học phí:</span> <strong>{formatCurrency(school.Avg_Offline || school.Avg_Online)}</strong></div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'center', padding: '12px 24px', background: `linear-gradient(135deg, ${COLORS.primary}, #8B0000)`, borderRadius: 12, color: 'white' }}>
                      <div style={{ fontSize: 11, opacity: 0.9 }}>ĐIỂM</div>
                      <div style={{ fontSize: 32, fontWeight: 700 }}>{school.TotalScore}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* DATA TAB */}
        {activeTab === 'data' && (
          <div>
            <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginBottom: 20 }}>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
                <input
                  type="text"
                  placeholder="🔍 Tìm trung tâm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ padding: '10px 16px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14, minWidth: 200 }}
                />
                <select value={filters.portfolio} onChange={(e) => setFilters(f => ({...f, portfolio: e.target.value}))} style={{ padding: '10px 16px', border: '1px solid #ddd', borderRadius: 8 }}>
                  <option value="all">Tất cả Portfolio</option>
                  <option value="HSK-Specialist">HSK-Specialist</option>
                  <option value="Communication-Focused">Communication-Focused</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Full-Service">Full-Service</option>
                </select>
                <select value={filters.teacher} onChange={(e) => setFilters(f => ({...f, teacher: e.target.value}))} style={{ padding: '10px 16px', border: '1px solid #ddd', borderRadius: 8 }}>
                  <option value="all">Tất cả GV</option>
                  <option value="Việt Nam">Việt Nam</option>
                  <option value="Bản xứ">Bản xứ</option>
                  <option value="Kết hợp">Kết hợp</option>
                </select>
                <div style={{ marginLeft: 'auto', color: '#666', fontSize: 13 }}>Hiển thị: {filteredData.length}/{stats.totalSchools}</div>
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 12, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', overflow: 'hidden' }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: COLORS.primary, color: 'white' }}>
                      {['Trường', 'Portfolio', 'Đa dạng', 'GV', 'Học phí', 'Giáo trình', 'Cam kết', 'Khóa', 'Điểm'].map((h, i) => (
                        <th key={i} style={{ padding: 12, textAlign: i > 1 ? 'center' : 'left', cursor: 'pointer' }} onClick={() => handleSort(['Trường', 'PortfolioStrategy', 'DiversityScore', 'TeacherType', 'Avg_Offline', 'Curriculum', 'CommitmentType', 'CourseCount', 'TotalScore'][i])}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((school, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? '#fff' : '#f9f9f9', borderBottom: '1px solid #eee' }}>
                        <td style={{ padding: 12, fontWeight: 500, maxWidth: 200 }}>{school.Trường}</td>
                        <td style={{ padding: 12, textAlign: 'center' }}>
                          <span style={{ padding: '2px 8px', borderRadius: 4, fontSize: 11, background: school.PortfolioStrategy === 'Full-Service' ? COLORS.primary : school.PortfolioStrategy === 'Hybrid' ? COLORS.secondary : '#eee', color: school.PortfolioStrategy === 'Full-Service' ? 'white' : COLORS.dark }}>
                            {school.PortfolioStrategy}
                          </span>
                        </td>
                        <td style={{ padding: 12, textAlign: 'center', fontWeight: 700, color: school.DiversityScore >= 3 ? COLORS.primary : COLORS.dark }}>{school.DiversityScore}</td>
                        <td style={{ padding: 12, textAlign: 'center' }}>{school.TeacherType}</td>
                        <td style={{ padding: 12, textAlign: 'right' }}>{formatCurrency(school.Avg_Offline)}</td>
                        <td style={{ padding: 12, textAlign: 'center' }}>{school.Curriculum}</td>
                        <td style={{ padding: 12, textAlign: 'center' }}>{school.CommitmentType}</td>
                        <td style={{ padding: 12, textAlign: 'center' }}>{school.CourseCount}</td>
                        <td style={{ padding: 12, textAlign: 'center', fontWeight: 700, color: COLORS.primary }}>{school.TotalScore}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer style={{ background: COLORS.dark, color: 'white', padding: '20px 32px', marginTop: 40, textAlign: 'center', fontSize: 13 }}>
        <p style={{ margin: 0, opacity: 0.8 }}>📊 Phân tích thị trường đào tạo Tiếng Trung | Dữ liệu: 69 trung tâm, 171 khóa học | 2025</p>
      </footer>
    </div>
  );
}
