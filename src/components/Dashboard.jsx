import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, ScatterChart, Scatter, ZAxis, LineChart, Line } from 'recharts';

// Embedded data - School portfolio data
const schoolData = [
  {"Trường":"CGE-Hoa Ngữ Quốc Tế","Has_HSK_CoBan":0,"Has_HSK_Cao":1,"Has_GiaoTiep":0,"Has_ThieuNhi":1,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":11413333,"Avg_Offline":17920000,"Curriculum":"HSK chuẩn","TeacherType":"Việt Nam","CommitmentType":"Học lại miễn phí","CourseCount":4,"Has_HSK":1,"DiversityScore":2,"PortfolioStrategy":"HSK-Specialist","TotalScore":73},
  {"Trường":"ChineseHSK","Has_HSK_CoBan":1,"Has_HSK_Cao":1,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":3000000,"Curriculum":"HSK chuẩn","TeacherType":"Việt Nam","CommitmentType":"Không cam kết","CourseCount":3,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":41},
  {"Trường":"Gia Sư Tiếng Trung Gia Huy","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":1,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":6000000,"Avg_Offline":0,"Curriculum":"Unknown","TeacherType":"Unknown","CommitmentType":"Không đề cập","CourseCount":2,"Has_HSK":1,"DiversityScore":2,"PortfolioStrategy":"Hybrid","TotalScore":34},
  {"Trường":"HOA NGỮ HỘI VIỆT HOA","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":0,"Curriculum":"Unknown","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":27},
  {"Trường":"HOA NGỮ NHÂN TÂM","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":2733333,"Avg_Offline":0,"Curriculum":"HSK chuẩn","TeacherType":"Việt Nam","CommitmentType":"Có cam kết","CourseCount":3,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":51},
  {"Trường":"HOA NGỮ NHẤT TÂM","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2100000,"Curriculum":"Unknown","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":27},
  {"Trường":"HOA NGỮ ĐẮC NHÂN","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":3350000,"Avg_Offline":4100000,"Curriculum":"HSK chuẩn","TeacherType":"Việt Nam","CommitmentType":"Có cam kết","CourseCount":4,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":53},
  {"Trường":"Hoa Ngữ Anh Đào","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2500000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Hoa Ngữ Gia Hân","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":3000000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Hoa Ngữ KHẢ HÂN","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":1700000,"Curriculum":"Unknown","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":27},
  {"Trường":"Hoa Ngữ Kim Trang","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2970000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Hoa Ngữ L.H CHINESE","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2595000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":2,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":32},
  {"Trường":"Hoa Ngữ Lê Trường","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Hoa Ngữ Những Người Bạn","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2500000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Hoa Ngữ Thành Nhân","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2500000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Hoa Ngữ Ánh Dương HSK","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":3000000,"Curriculum":"HSK chuẩn","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":2,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":36},
  {"Trường":"Hoa Ngữ Đại Bảo","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Hoa ngữ & Tin Học Triều Châu","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Hoa ngữ 51","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Hoa ngữ Vương Gia","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2800000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Hoa ngữ phi thành","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2500000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Hoa ngữ phong vân","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2500000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Hoa ngữ quốc tế CGE","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":7680000,"Avg_Offline":0,"Curriculum":"HSK chuẩn","TeacherType":"Việt Nam","CommitmentType":"Học lại miễn phí","CourseCount":6,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":60},
  {"Trường":"Hán ngữ Trần Kiến","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":1,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":4166667,"Curriculum":"HSK chuẩn","TeacherType":"Kết hợp","CommitmentType":"Không đề cập","CourseCount":6,"Has_HSK":1,"DiversityScore":2,"PortfolioStrategy":"HSK-Specialist","TotalScore":65},
  {"Trường":"KAI Center","Has_HSK_CoBan":0,"Has_HSK_Cao":0,"Has_GiaoTiep":1,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":4500000,"Curriculum":"Tự biên soạn","TeacherType":"Kết hợp","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":0,"DiversityScore":1,"PortfolioStrategy":"Communication-Focused","TotalScore":27},
  {"Trường":"MLS","Has_HSK_CoBan":0,"Has_HSK_Cao":0,"Has_GiaoTiep":1,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":6820000,"Curriculum":"Tự biên soạn","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":3,"Has_HSK":0,"DiversityScore":1,"PortfolioStrategy":"Communication-Focused","TotalScore":23},
  {"Trường":"Newsky","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":1,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":3875000,"Curriculum":"Hán Ngữ","TeacherType":"Kết hợp","CommitmentType":"Có cam kết","CourseCount":5,"Has_HSK":1,"DiversityScore":2,"PortfolioStrategy":"HSK-Specialist","TotalScore":65},
  {"Trường":"Ngoại ngữ Tầm Nhìn Việt","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":3000000,"Curriculum":"HSK chuẩn","TeacherType":"Bản xứ","CommitmentType":"Học lại miễn phí","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":60},
  {"Trường":"Ni Hao Ma Mandarin","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":1,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":5475000,"Curriculum":"HSK chuẩn","TeacherType":"Bản xứ","CommitmentType":"Có cam kết","CourseCount":4,"Has_HSK":1,"DiversityScore":2,"PortfolioStrategy":"HSK-Specialist","TotalScore":68},
  {"Trường":"RISE Chinese","Has_HSK_CoBan":0,"Has_HSK_Cao":0,"Has_GiaoTiep":1,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":15000000,"Avg_Offline":30000000,"Curriculum":"Tự biên soạn","TeacherType":"Bản xứ","CommitmentType":"Không đề cập","CourseCount":2,"Has_HSK":0,"DiversityScore":1,"PortfolioStrategy":"Communication-Focused","TotalScore":39},
  {"Trường":"Solf","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":1,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":3300000,"Avg_Offline":4200000,"Curriculum":"Hán Ngữ","TeacherType":"Kết hợp","CommitmentType":"Có cam kết","CourseCount":3,"Has_HSK":1,"DiversityScore":2,"PortfolioStrategy":"HSK-Specialist","TotalScore":69},
  {"Trường":"TIẾNG HOA FT 365","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":2000000,"Avg_Offline":2300000,"Curriculum":"HSK chuẩn","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":4,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":38},
  {"Trường":"TIẾNG TRUNG ANNA","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"TIẾNG TRUNG HOÀI NGÔ","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"TIẾNG TRUNG KIM OANH","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"TIẾNG TRUNG THẦY CHEN","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":2000000,"Avg_Offline":1950000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Có cam kết","CourseCount":2,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":44},
  {"Trường":"TRUNG TÂM HOA NGỮ THỪA YẾN","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"TRUNG TÂM HOA NGỮ HOA LẠC","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"TRUNG TÂM HOA VĂN LỄ VĂN","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2700000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"TRUNG TÂM TIẾNG TRUNG TƯƠNG LAI","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2500000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Tiếng Hoa Vi Vi","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2300000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Tiếng Hoa cô Ruãn","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2500000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Tiếng Trung Amei","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":3740000,"Avg_Offline":4100000,"Curriculum":"HSK chuẩn","TeacherType":"Kết hợp","CommitmentType":"Không đề cập","CourseCount":4,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":45},
  {"Trường":"Tiếng Trung DEYSI","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":1700000,"Curriculum":"Tự biên soạn","TeacherType":"Việt Nam","CommitmentType":"Học lại miễn phí","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":42},
  {"Trường":"Tiếng Trung Hoài Ngô Bình Dương","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":900000,"Avg_Offline":0,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":3,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":34},
  {"Trường":"Tiếng Trung Kim Tứ Gia","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Tiếng Trung Musan","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":3600000,"Avg_Offline":0,"Curriculum":"HSK chuẩn","TeacherType":"Việt Nam","CommitmentType":"Có cam kết","CourseCount":3,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":51},
  {"Trường":"Tiếng Trung Mỗi Ngày","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":4160000,"Avg_Offline":0,"Curriculum":"HSK chuẩn","TeacherType":"Việt Nam","CommitmentType":"Có cam kết","CourseCount":4,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":53},
  {"Trường":"Tiếng Trung Mộc Mộc","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2500000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Tiếng Trung Ni Hao","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":1,"Has_ThieuNhi":1,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":3490000,"Curriculum":"Tự biên soạn","TeacherType":"Kết hợp","CommitmentType":"Không cam kết","CourseCount":5,"Has_HSK":1,"DiversityScore":3,"PortfolioStrategy":"Full-Service","TotalScore":78},
  {"Trường":"Tiếng Trung Sao Việt","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Tiếng Trung THANHMAIHSK","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":0,"Curriculum":"HSK chuẩn","TeacherType":"Việt Nam","CommitmentType":"Có cam kết","CourseCount":2,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":45},
  {"Trường":"Tiếng Trung Xin Chào","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":1,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2990000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Học lại miễn phí","CourseCount":4,"Has_HSK":1,"DiversityScore":2,"PortfolioStrategy":"HSK-Specialist","TotalScore":57},
  {"Trường":"Tiếng Trung Đông Nam Bộ","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2500000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Trung Tâm Dạy Tiếng Trung Sao Việt BD","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Trung Tâm Hoa Văn Cát Nhiên","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2500000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Trung Tâm Ôn Ngọc Là Bạn","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":1,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":4066667,"Avg_Offline":4133333,"Curriculum":"HSK chuẩn","TeacherType":"Việt Nam","CommitmentType":"Học lại miễn phí","CourseCount":5,"Has_HSK":1,"DiversityScore":2,"PortfolioStrategy":"HSK-Specialist","TotalScore":75},
  {"Trường":"Trung Tâm Tiếng Trung HD","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":3000000,"Curriculum":"HSK chuẩn","TeacherType":"Việt Nam","CommitmentType":"Có cam kết","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":45},
  {"Trường":"Trung Tâm Tiếng Trung Hoa Việt","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2800000,"Curriculum":"HSK chuẩn","TeacherType":"Kết hợp","CommitmentType":"Không đề cập","CourseCount":4,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":43},
  {"Trường":"Trung Tâm Tiếng Trung Đông Phương","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":4066667,"Avg_Offline":4100000,"Curriculum":"HSK chuẩn","TeacherType":"Kết hợp","CommitmentType":"Học lại miễn phí","CourseCount":4,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":58},
  {"Trường":"Trung Tâm Đào Tạo Tiếng Trung Thầy Hiên","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2500000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Trung tâm Ngoại ngữ EVERGREEN","Has_HSK_CoBan":0,"Has_HSK_Cao":0,"Has_GiaoTiep":1,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":1300000,"Curriculum":"Tự biên soạn","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":0,"DiversityScore":1,"PortfolioStrategy":"Communication-Focused","TotalScore":19},
  {"Trường":"Trung tâm Ngoại ngữ Hoa Thành","Has_HSK_CoBan":0,"Has_HSK_Cao":0,"Has_GiaoTiep":1,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":650000,"Curriculum":"Tự biên soạn","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":0,"DiversityScore":1,"PortfolioStrategy":"Communication-Focused","TotalScore":19},
  {"Trường":"Trung tâm Tiếng Trung KAT Education","Has_HSK_CoBan":1,"Has_HSK_Cao":1,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":1,"Avg_Online":2000000,"Avg_Offline":0,"Curriculum":"Unknown","TeacherType":"Unknown","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":2,"PortfolioStrategy":"HSK-Specialist","TotalScore":34},
  {"Trường":"Trung tâm tiếng Trung Hoa văn SaigonHSK","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":3890000,"Avg_Offline":4100000,"Curriculum":"HSK chuẩn","TeacherType":"Kết hợp","CommitmentType":"Học lại miễn phí","CourseCount":4,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":58},
  {"Trường":"Trung tâm tiếng hoa hội nghĩa","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2600000,"Curriculum":"Hán Ngữ","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":30},
  {"Trường":"Trung tâm đào tạo Hoa ngữ","Has_HSK_CoBan":0,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":1,"Avg_Online":0,"Avg_Offline":800000,"Curriculum":"Unknown","TeacherType":"Việt Nam","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":0,"DiversityScore":1,"PortfolioStrategy":"Other","TotalScore":27},
  {"Trường":"You Can","Has_HSK_CoBan":1,"Has_HSK_Cao":0,"Has_GiaoTiep":0,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":3520000,"Avg_Offline":4100000,"Curriculum":"HSK chuẩn","TeacherType":"Kết hợp","CommitmentType":"Học lại miễn phí","CourseCount":5,"Has_HSK":1,"DiversityScore":1,"PortfolioStrategy":"HSK-Specialist","TotalScore":63},
  {"Trường":"iChinese","Has_HSK_CoBan":0,"Has_HSK_Cao":0,"Has_GiaoTiep":1,"Has_ThieuNhi":0,"Has_ChuyenNganh":0,"Has_Intensive":0,"Avg_Online":0,"Avg_Offline":2480000,"Curriculum":"Tự biên soạn","TeacherType":"Kết hợp","CommitmentType":"Không đề cập","CourseCount":1,"Has_HSK":0,"DiversityScore":1,"PortfolioStrategy":"Communication-Focused","TotalScore":27}
];

// Color palette - Chinese-inspired
const COLORS = {
  primary: '#C41E3A', // Chinese red
  secondary: '#FFD700', // Gold
  accent: '#1E3A5F', // Navy
  success: '#2D5A27', // Forest green
  warning: '#E8A317', // Amber
  neutral: '#4A4A4A',
  light: '#F5F0E6',
  dark: '#1A1A2E',
};

const CHART_COLORS = ['#C41E3A', '#FFD700', '#1E3A5F', '#2D5A27', '#E8A317', '#8B4513', '#4A90D9'];

const formatCurrency = (value) => {
  if (!value || value === 0) return '-';
  return new Intl.NumberFormat('vi-VN', { 
    style: 'decimal',
    maximumFractionDigits: 0 
  }).format(value) + 'đ';
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

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    let result = [...schoolData];
    
    if (searchTerm) {
      result = result.filter(s => s.Trường.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    
    if (filters.portfolio !== 'all') {
      result = result.filter(s => s.PortfolioStrategy === filters.portfolio);
    }
    
    if (filters.diversity !== 'all') {
      const div = parseInt(filters.diversity);
      if (div === 3) {
        result = result.filter(s => s.DiversityScore >= 3);
      } else {
        result = result.filter(s => s.DiversityScore === div);
      }
    }
    
    if (filters.teacher !== 'all') {
      result = result.filter(s => s.TeacherType === filters.teacher);
    }
    
    if (filters.commitment !== 'all') {
      result = result.filter(s => s.CommitmentType === filters.commitment);
    }
    
    result.sort((a, b) => {
      const aVal = a[sortConfig.key] || 0;
      const bVal = b[sortConfig.key] || 0;
      return sortConfig.direction === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
    
    return result;
  }, [filters, sortConfig, searchTerm]);

  // Summary statistics
  const stats = useMemo(() => ({
    totalSchools: schoolData.length,
    hskOnly: schoolData.filter(s => s.Has_HSK === 1 && s.Has_GiaoTiep === 0).length,
    giaotiepOnly: schoolData.filter(s => s.Has_HSK === 0 && s.Has_GiaoTiep === 1).length,
    hybrid: schoolData.filter(s => s.Has_HSK === 1 && s.Has_GiaoTiep === 1).length,
    hasThieuNhi: schoolData.filter(s => s.Has_ThieuNhi === 1).length,
    hasChuyenNganh: schoolData.filter(s => s.Has_ChuyenNganh === 1).length,
    avgPrice: schoolData.filter(s => s.Avg_Offline > 0).reduce((a, b) => a + b.Avg_Offline, 0) / 
              schoolData.filter(s => s.Avg_Offline > 0).length,
  }), []);

  // Chart data
  const portfolioChartData = useMemo(() => {
    const counts = {};
    schoolData.forEach(s => {
      counts[s.PortfolioStrategy] = (counts[s.PortfolioStrategy] || 0) + 1;
    });
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
      if (s.TeacherType && s.TeacherType !== 'Unknown') {
        counts[s.TeacherType] = (counts[s.TeacherType] || 0) + 1;
      }
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  const top5 = useMemo(() => 
    [...schoolData].sort((a, b) => b.TotalScore - a.TotalScore).slice(0, 5)
  , []);

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'desc' ? 'asc' : 'desc'
    }));
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
          <h1 style={{ 
            margin: 0, 
            fontSize: 28, 
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
          }}>
            <span style={{ fontSize: 36 }}>中</span>
            Phân Tích Thị Trường Đào Tạo Tiếng Trung
          </h1>
          <p style={{ margin: '8px 0 0', opacity: 0.9, fontSize: 14 }}>
            Dashboard khảo sát {stats.totalSchools} trung tâm | Dữ liệu định lượng + định tính
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
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', gap: 0 }}>
          {[
            { id: 'overview', label: '📊 Tổng quan' },
            { id: 'portfolio', label: '📦 Portfolio Analysis' },
            { id: 'competitors', label: '🏆 Top Đối thủ' },
            { id: 'data', label: '📋 Dữ liệu chi tiết' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '16px 24px',
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
            {/* Key Metrics */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
              gap: 16, 
              marginBottom: 32 
            }}>
              {[
                { label: 'Tổng trung tâm', value: stats.totalSchools, color: COLORS.primary },
                { label: 'HSK-only', value: `${stats.hskOnly} (${(stats.hskOnly/stats.totalSchools*100).toFixed(0)}%)`, color: COLORS.accent },
                { label: 'Giao tiếp-only', value: `${stats.giaotiepOnly} (${(stats.giaotiepOnly/stats.totalSchools*100).toFixed(0)}%)`, color: COLORS.success },
                { label: 'Hybrid (HSK+GT)', value: `${stats.hybrid} (${(stats.hybrid/stats.totalSchools*100).toFixed(0)}%)`, color: COLORS.secondary },
                { label: 'Có Thiếu nhi', value: `${stats.hasThieuNhi} (${(stats.hasThieuNhi/stats.totalSchools*100).toFixed(0)}%)`, color: COLORS.warning },
                { label: 'Có Chuyên ngành', value: `${stats.hasChuyenNganh} (0%)`, color: '#999' },
              ].map((metric, i) => (
                <div key={i} style={{
                  background: 'white',
                  borderRadius: 12,
                  padding: 20,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  borderLeft: `4px solid ${metric.color}`,
                }}>
                  <div style={{ color: '#666', fontSize: 13, marginBottom: 8 }}>{metric.label}</div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: metric.color }}>{metric.value}</div>
                </div>
              ))}
            </div>

            {/* Critical Insights Box */}
            <div style={{
              background: `linear-gradient(135deg, ${COLORS.primary}15, ${COLORS.secondary}15)`,
              border: `2px solid ${COLORS.primary}`,
              borderRadius: 12,
              padding: 24,
              marginBottom: 32,
            }}>
              <h3 style={{ margin: '0 0 16px', color: COLORS.primary, display: 'flex', alignItems: 'center', gap: 8 }}>
                🔴 Critical Market Gaps
              </h3>
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

            {/* Charts Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              {/* Portfolio Strategy Pie */}
              <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Chiến lược Portfolio</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={portfolioChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {portfolioChartData.map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Diversity Distribution */}
              <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Độ đa dạng khóa học</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={diversityChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill={COLORS.primary} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}

        {/* PORTFOLIO TAB */}
        {activeTab === 'portfolio' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 32 }}>
              {/* Teacher Distribution */}
              <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Phân bố Loại Giáo viên</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie
                      data={teacherChartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {teacherChartData.map((_, index) => (
                        <Cell key={index} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Price by Teacher Type */}
              <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Học phí trung bình theo Loại GV</h3>
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={[
                    { name: 'GV Bản xứ', price: 8332368 },
                    { name: 'Kết hợp', price: 5356000 },
                    { name: 'GV Việt', price: 3495020 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(v) => (v/1000000).toFixed(1) + 'M'} />
                    <Tooltip formatter={(v) => formatCurrency(v)} />
                    <Bar dataKey="price" fill={COLORS.accent} radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Portfolio Matrix */}
            <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
              <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Ma trận đa dạng sản phẩm - Top 15 Trung tâm</h3>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: COLORS.light }}>
                      <th style={{ padding: 12, textAlign: 'left', borderBottom: `2px solid ${COLORS.primary}` }}>Trung tâm</th>
                      <th style={{ padding: 12, textAlign: 'center', borderBottom: `2px solid ${COLORS.primary}` }}>HSK</th>
                      <th style={{ padding: 12, textAlign: 'center', borderBottom: `2px solid ${COLORS.primary}` }}>Giao tiếp</th>
                      <th style={{ padding: 12, textAlign: 'center', borderBottom: `2px solid ${COLORS.primary}` }}>Thiếu nhi</th>
                      <th style={{ padding: 12, textAlign: 'center', borderBottom: `2px solid ${COLORS.primary}` }}>Chuyên ngành</th>
                      <th style={{ padding: 12, textAlign: 'center', borderBottom: `2px solid ${COLORS.primary}` }}>Intensive</th>
                      <th style={{ padding: 12, textAlign: 'center', borderBottom: `2px solid ${COLORS.primary}` }}>Tổng loại</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...schoolData].sort((a, b) => b.DiversityScore - a.DiversityScore).slice(0, 15).map((school, i) => (
                      <tr key={i} style={{ background: i % 2 === 0 ? 'white' : COLORS.light }}>
                        <td style={{ padding: 12, fontWeight: school.DiversityScore >= 3 ? 700 : 400 }}>
                          {school.DiversityScore >= 3 && '🏆 '}{school.Trường}
                        </td>
                        <td style={{ padding: 12, textAlign: 'center' }}>{school.Has_HSK ? '✅' : '❌'}</td>
                        <td style={{ padding: 12, textAlign: 'center' }}>{school.Has_GiaoTiep ? '✅' : '❌'}</td>
                        <td style={{ padding: 12, textAlign: 'center' }}>{school.Has_ThieuNhi ? '✅' : '❌'}</td>
                        <td style={{ padding: 12, textAlign: 'center' }}>{school.Has_ChuyenNganh ? '✅' : '❌'}</td>
                        <td style={{ padding: 12, textAlign: 'center' }}>{school.Has_Intensive ? '✅' : '❌'}</td>
                        <td style={{ padding: 12, textAlign: 'center', fontWeight: 700, color: school.DiversityScore >= 3 ? COLORS.primary : COLORS.dark }}>
                          {school.DiversityScore}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* COMPETITORS TAB */}
        {activeTab === 'competitors' && (
          <div>
            <h2 style={{ margin: '0 0 24px', color: COLORS.dark }}>🏆 TOP 5 Đối thủ Mạnh nhất</h2>
            <div style={{ display: 'grid', gap: 20 }}>
              {top5.map((school, i) => (
                <div key={i} style={{
                  background: 'white',
                  borderRadius: 12,
                  padding: 24,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  borderLeft: `5px solid ${i === 0 ? COLORS.secondary : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : COLORS.accent}`,
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                        <span style={{ 
                          fontSize: 24, 
                          fontWeight: 700, 
                          color: i === 0 ? COLORS.secondary : i === 1 ? '#C0C0C0' : i === 2 ? '#CD7F32' : COLORS.dark 
                        }}>
                          #{i + 1}
                        </span>
                        <h3 style={{ margin: 0, fontSize: 18 }}>{school.Trường}</h3>
                        <span style={{
                          background: school.PortfolioStrategy === 'Full-Service' ? COLORS.primary : 
                                     school.PortfolioStrategy === 'Hybrid' ? COLORS.success : COLORS.accent,
                          color: 'white',
                          padding: '4px 12px',
                          borderRadius: 20,
                          fontSize: 11,
                          fontWeight: 600,
                        }}>
                          {school.PortfolioStrategy}
                        </span>
                      </div>
                      <div style={{ display: 'flex', gap: 24, marginTop: 12, fontSize: 13, color: '#666' }}>
                        <span>📊 Điểm tổng: <strong style={{ color: COLORS.primary }}>{school.TotalScore}</strong></span>
                        <span>📦 Đa dạng: <strong>{school.DiversityScore} loại</strong></span>
                        <span>👨‍🏫 GV: <strong>{school.TeacherType}</strong></span>
                        <span>🎯 Cam kết: <strong>{school.CommitmentType}</strong></span>
                        <span>💰 Học phí: <strong>{formatCurrency(school.Avg_Offline || school.Avg_Online)}</strong></span>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 11, color: '#999', marginBottom: 4 }}>Course offerings</div>
                      <div style={{ display: 'flex', gap: 8 }}>
                        {school.Has_HSK === 1 && <span style={{ background: COLORS.accent, color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: 11 }}>HSK</span>}
                        {school.Has_GiaoTiep === 1 && <span style={{ background: COLORS.success, color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: 11 }}>Giao tiếp</span>}
                        {school.Has_ThieuNhi === 1 && <span style={{ background: COLORS.warning, color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: 11 }}>Thiếu nhi</span>}
                        {school.Has_Intensive === 1 && <span style={{ background: COLORS.primary, color: 'white', padding: '4px 8px', borderRadius: 4, fontSize: 11 }}>Intensive</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Competitive Map Visualization */}
            <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.08)', marginTop: 32 }}>
              <h3 style={{ margin: '0 0 16px', color: COLORS.dark }}>Bản đồ cạnh tranh: Đa dạng vs Học phí</h3>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    type="number" 
                    dataKey="DiversityScore" 
                    name="Đa dạng" 
                    domain={[0, 4]}
                    label={{ value: 'Độ đa dạng (số loại khóa)', position: 'bottom' }}
                  />
                  <YAxis 
                    type="number" 
                    dataKey="price" 
                    name="Học phí" 
                    tickFormatter={(v) => (v/1000000).toFixed(0) + 'M'}
                    label={{ value: 'Học phí (VNĐ)', angle: -90, position: 'left' }}
                  />
                  <ZAxis type="number" dataKey="CourseCount" range={[50, 300]} name="Số khóa" />
                  <Tooltip 
                    formatter={(value, name) => name === 'Học phí' ? formatCurrency(value) : value}
                    content={({ payload }) => {
                      if (!payload || !payload.length) return null;
                      const d = payload[0].payload;
                      return (
                        <div style={{ background: 'white', padding: 12, border: '1px solid #ddd', borderRadius: 8 }}>
                          <div style={{ fontWeight: 700, marginBottom: 8 }}>{d.name}</div>
                          <div>Đa dạng: {d.DiversityScore} loại</div>
                          <div>Học phí: {formatCurrency(d.price)}</div>
                          <div>Số khóa: {d.CourseCount}</div>
                        </div>
                      );
                    }}
                  />
                  <Scatter 
                    data={schoolData.filter(s => (s.Avg_Offline || s.Avg_Online) > 0).map(s => ({
                      ...s,
                      name: s.Trường,
                      price: s.Avg_Offline || s.Avg_Online,
                    }))}
                    fill={COLORS.primary}
                  />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* DATA TAB */}
        {activeTab === 'data' && (
          <div>
            {/* Filters */}
            <div style={{ 
              background: 'white', 
              borderRadius: 12, 
              padding: 20, 
              marginBottom: 24,
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 16,
              alignItems: 'center',
            }}>
              <input
                type="text"
                placeholder="🔍 Tìm kiếm trung tâm..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px 16px',
                  border: '1px solid #ddd',
                  borderRadius: 8,
                  fontSize: 14,
                  width: 250,
                }}
              />
              
              <select 
                value={filters.portfolio}
                onChange={(e) => setFilters(f => ({ ...f, portfolio: e.target.value }))}
                style={{ padding: '10px 16px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
              >
                <option value="all">Tất cả Portfolio</option>
                <option value="HSK-Specialist">HSK-Specialist</option>
                <option value="Communication-Focused">Communication-Focused</option>
                <option value="Hybrid">Hybrid</option>
                <option value="Full-Service">Full-Service</option>
              </select>

              <select 
                value={filters.diversity}
                onChange={(e) => setFilters(f => ({ ...f, diversity: e.target.value }))}
                style={{ padding: '10px 16px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
              >
                <option value="all">Tất cả độ đa dạng</option>
                <option value="1">1 loại</option>
                <option value="2">2 loại</option>
                <option value="3">3+ loại</option>
              </select>

              <select 
                value={filters.teacher}
                onChange={(e) => setFilters(f => ({ ...f, teacher: e.target.value }))}
                style={{ padding: '10px 16px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
              >
                <option value="all">Tất cả loại GV</option>
                <option value="Bản xứ">GV Bản xứ</option>
                <option value="Kết hợp">Kết hợp</option>
                <option value="Việt Nam">GV Việt Nam</option>
              </select>

              <select 
                value={filters.commitment}
                onChange={(e) => setFilters(f => ({ ...f, commitment: e.target.value }))}
                style={{ padding: '10px 16px', border: '1px solid #ddd', borderRadius: 8, fontSize: 14 }}
              >
                <option value="all">Tất cả cam kết</option>
                <option value="Học lại miễn phí">Học lại miễn phí</option>
                <option value="Có cam kết">Có cam kết</option>
                <option value="Không cam kết">Không cam kết</option>
              </select>

              <span style={{ marginLeft: 'auto', color: '#666', fontSize: 13 }}>
                Hiển thị: <strong>{filteredData.length}</strong> / {schoolData.length} trung tâm
              </span>
            </div>

            {/* Data Table */}
            <div style={{ 
              background: 'white', 
              borderRadius: 12, 
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              overflow: 'hidden',
            }}>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: COLORS.primary, color: 'white' }}>
                      {[
                        { key: 'Trường', label: 'Trung tâm' },
                        { key: 'PortfolioStrategy', label: 'Chiến lược' },
                        { key: 'DiversityScore', label: 'Đa dạng' },
                        { key: 'TeacherType', label: 'Loại GV' },
                        { key: 'Avg_Offline', label: 'Học phí Offline' },
                        { key: 'Curriculum', label: 'Giáo trình' },
                        { key: 'CommitmentType', label: 'Cam kết' },
                        { key: 'CourseCount', label: 'Số khóa' },
                        { key: 'TotalScore', label: 'Điểm' },
                      ].map(col => (
                        <th 
                          key={col.key}
                          onClick={() => handleSort(col.key)}
                          style={{ 
                            padding: 14, 
                            textAlign: col.key === 'Trường' ? 'left' : 'center',
                            cursor: 'pointer',
                            userSelect: 'none',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {col.label} {sortConfig.key === col.key && (sortConfig.direction === 'asc' ? '↑' : '↓')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((school, i) => {
                      const isTop5 = top5.some(t => t.Trường === school.Trường);
                      return (
                        <tr 
                          key={i} 
                          style={{ 
                            background: isTop5 ? `${COLORS.secondary}20` : i % 2 === 0 ? 'white' : COLORS.light,
                            borderLeft: isTop5 ? `4px solid ${COLORS.secondary}` : 'none',
                          }}
                        >
                          <td style={{ padding: 12, fontWeight: isTop5 ? 700 : 400 }}>
                            {isTop5 && '🏆 '}{school.Trường}
                          </td>
                          <td style={{ padding: 12, textAlign: 'center' }}>
                            <span style={{
                              background: school.PortfolioStrategy === 'Full-Service' ? COLORS.primary : 
                                         school.PortfolioStrategy === 'Hybrid' ? COLORS.success : 
                                         school.PortfolioStrategy === 'HSK-Specialist' ? COLORS.accent : '#999',
                              color: 'white',
                              padding: '3px 8px',
                              borderRadius: 12,
                              fontSize: 11,
                            }}>
                              {school.PortfolioStrategy}
                            </span>
                          </td>
                          <td style={{ padding: 12, textAlign: 'center', fontWeight: 700, color: school.DiversityScore >= 3 ? COLORS.primary : COLORS.dark }}>
                            {school.DiversityScore}
                          </td>
                          <td style={{ padding: 12, textAlign: 'center' }}>{school.TeacherType}</td>
                          <td style={{ padding: 12, textAlign: 'right' }}>{formatCurrency(school.Avg_Offline)}</td>
                          <td style={{ padding: 12, textAlign: 'center' }}>{school.Curriculum}</td>
                          <td style={{ padding: 12, textAlign: 'center' }}>{school.CommitmentType}</td>
                          <td style={{ padding: 12, textAlign: 'center' }}>{school.CourseCount}</td>
                          <td style={{ padding: 12, textAlign: 'center', fontWeight: 700, color: COLORS.primary }}>
                            {school.TotalScore}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        background: COLORS.dark,
        color: 'white',
        padding: '20px 32px',
        marginTop: 40,
        textAlign: 'center',
        fontSize: 13,
      }}>
        <p style={{ margin: 0, opacity: 0.8 }}>
          📊 Phân tích thị trường đào tạo Tiếng Trung | Dữ liệu: 69 trung tâm, 171 khóa học | 2025
        </p>
      </footer>
    </div>
  );
}
