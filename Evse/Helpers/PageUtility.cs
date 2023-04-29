using Microsoft.EntityFrameworkCore;
using NetUtility;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Evse.Helpers
{
    public static class PageUtility
    {
        public static async Task<Pager<T>> ToPaginationAsync<T>(this IQueryable<T> query, int currentPage, int pageSize = Commons.PageSize) where T : class
        {
            //Tính tổng số lượng record
            var count = await query.CountAsync();

            //Tính số lượng bỏ qua
            int skip = (currentPage - 1) * pageSize;

            //Lấy ra số lượng record của trang hiện tại
            var items = await query.Skip(skip).Take(pageSize).ToListAsync();
            return new Pager<T>(items, count, currentPage, pageSize);
        }

        public static string GetUrlPagination(this string url, string queryString)
        {
            string result = string.Empty;

            if (!queryString.IsNullOrEmpty())
            {
                var arrQueryString = queryString.Split("&");


                bool flag = false;
                for (int i = 0; i < arrQueryString.Length; i++)
                {
                    string temp = arrQueryString[i];
                    if (temp.Contains("page"))
                    {
                        temp = Regex.Replace(arrQueryString[i], @"\d+", "{0}");

                        arrQueryString[i] = temp;
                        flag = true;
                        break;
                    }
                }
                if (!flag)
                {
                    result = url + string.Join("&", arrQueryString) + "&page={0}";
                }
                else result = url + string.Join("&", arrQueryString);
                return result;
            }
            else
            {
                return url + "?page={0}";
            }
            
        }
    }

    public class Pager<T> where T : class
    {
        public Pager(List<T> result, int totalItems, int currentPage = 1, int pageSize = Commons.PageSize, int maxPages = Commons.MaxPagePagination)
        {
            var totalPages = (int)Math.Ceiling((decimal)totalItems / (decimal)pageSize);

            if (currentPage < 1)
            {
                currentPage = 1;
            }
            else if (currentPage > totalPages)
            {
                currentPage = totalPages;
            }

            int startPage, endPage;
            if (totalPages <= maxPages)
            {
                startPage = 1;
                endPage = totalPages;
            }
            else
            {
                var maxPagesBeforeCurrentPage = (int)Math.Floor((decimal)maxPages / (decimal)2);
                var maxPagesAfterCurrentPage = (int)Math.Ceiling((decimal)maxPages / (decimal)2) - 1;
                if (currentPage <= maxPagesBeforeCurrentPage)
                {
                    startPage = 1;
                    endPage = maxPages;
                }
                else if (currentPage + maxPagesAfterCurrentPage >= totalPages)
                {
                    startPage = totalPages - maxPages + 1;
                    endPage = totalPages;
                }
                else
                {
                    startPage = currentPage - maxPagesBeforeCurrentPage;
                    endPage = currentPage + maxPagesAfterCurrentPage;
                }
            }

            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.Min(startIndex + pageSize - 1, totalItems - 1);

            var pages = Enumerable.Range(startPage, (endPage + 1) - startPage).ToList();

            Result = result;
            TotalItems = totalItems;
            CurrentPage = currentPage;
            PageSize = pageSize;
            TotalPages = totalPages;
            StartPage = startPage;
            EndPage = endPage;
            StartIndex = startIndex;
            EndIndex = endIndex;
            PageNext = currentPage + 1 > totalPages ? totalPages : currentPage + 1;
            PagePrev = currentPage - 1 <= 0 ? 1 : currentPage - 1;
            PageFirst = 1;
            PageLast = totalPages;
            Pages = pages;
        }

        public int TotalItems { get; private set; }
        public int CurrentPage { get; private set; }
        public int PageSize { get; private set; }
        public int TotalPages { get; private set; }
        public int StartPage { get; private set; }
        public int EndPage { get; private set; }
        public int StartIndex { get; private set; }
        public int EndIndex { get; private set; }
        public int PageNext { get; private set; }
        public int PagePrev { get; private set; }
        public int PageFirst { get; private set; }
        public int PageLast { get; private set; }
        public List<int> Pages { get; private set; }
        public List<T> Result { get; private set; }
    }

    public class PagerElastic<T> where T : class
    {
        public PagerElastic(
            List<T> result,
            int totalItems,
            int currentPage = 1,
            int pageSize = 10,
            int maxPages = 10)
        {

            // calculate total pages
            var totalPages = (int)Math.Ceiling((decimal)totalItems / (decimal)pageSize);

            // ensure current page isn't out of range
            if (currentPage < 1)
            {
                currentPage = 1;
            }
            else if (currentPage > totalPages)
            {
                currentPage = totalPages;
            }

            int startPage, endPage;
            if (totalPages <= maxPages)
            {
                // total pages less than max so show all pages
                startPage = 1;
                endPage = totalPages;
            }
            else
            {
                // total pages more than max so calculate start and end pages
                var maxPagesBeforeCurrentPage = (int)Math.Floor((decimal)maxPages / (decimal)2);
                var maxPagesAfterCurrentPage = (int)Math.Ceiling((decimal)maxPages / (decimal)2) - 1;
                if (currentPage <= maxPagesBeforeCurrentPage)
                {
                    // current page near the start
                    startPage = 1;
                    endPage = maxPages;
                }
                else if (currentPage + maxPagesAfterCurrentPage >= totalPages)
                {
                    // current page near the end
                    startPage = totalPages - maxPages + 1;
                    endPage = totalPages;
                }
                else
                {
                    // current page somewhere in the middle
                    startPage = currentPage - maxPagesBeforeCurrentPage;
                    endPage = currentPage + maxPagesAfterCurrentPage;
                }
            }

            // calculate start and end item indexes
            var startIndex = (currentPage - 1) * pageSize;
            var endIndex = Math.Min(startIndex + pageSize - 1, totalItems - 1);

            // create an array of pages that can be looped over
            var pages = Enumerable.Range(startPage, (endPage + 1) - startPage).ToList();

            // update object instance with all pager properties required by the view
            TotalItems = totalItems;
            CurrentPage = currentPage;
            PageSize = pageSize;
            TotalPages = totalPages;
            StartPage = startPage;
            EndPage = endPage;
            StartIndex = startIndex;
            EndIndex = endIndex;
            Pages = pages;
            Results = result;
            PageNext = currentPage + 1 > totalPages ? totalPages : currentPage + 1;
            PagePrev = currentPage - 1 <= 0 ? 1 : currentPage - 1;
            PageFirst = 1;
            PageLast = totalPages;
        }

        public int TotalItems { get; private set; }
        public int CurrentPage { get; private set; }
        public int PageSize { get; private set; }
        public int TotalPages { get; private set; }
        public int StartPage { get; private set; }
        public int EndPage { get; private set; }
        public int StartIndex { get; private set; }
        public int EndIndex { get; private set; }
        public int PageNext { get; private set; }
        public int PagePrev { get; private set; }
        public int PageFirst { get; private set; }
        public int PageLast { get; private set; }
        public List<int> Pages { get; private set; }
        public List<T> Results { get; set; }
    }

    public class ParamaterPagination
    {
        public int page { get; set; }
        public int pageSize { get; set; } = 10;
    }
}