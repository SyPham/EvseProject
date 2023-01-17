using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using Evse.Constants;
using Evse.Data;
using Evse.DTO;
using Evse.Helpers;
using Evse.Models;
using Evse.Services.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Syncfusion.JavaScript;
using Syncfusion.JavaScript.DataSources;
using Microsoft.Extensions.Configuration;
using System.Net.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using NetUtility;

namespace Evse.Services
{
    public class MessageParams
    {
        public string Token { get; set; }
        public string Message { get; set; }
        public string StickerPackageId { get; set; }
        public string StickerId { get; set; }
        public string FileUri { get; set; }
        public string Filename { get; set; }
    }
    public interface ILineService
    {
        Task SendMessage(MessageParams msg);
        Task<string> FetchToken(string code);
    }
    public class LineService : ILineService
    {
        private readonly IConfiguration _config;
        private readonly string _notifyUrl;
        private readonly string _tokenUrl;

        private readonly string _clientId;
        private readonly string _clientSecret;
        private readonly string _redirectUri;
        private readonly string _successUri;
        private readonly string _secret;
        private readonly LineUtility _line;

        public LineService(IConfiguration config)
        {
            _config = config;
            var lineConfig = _config.GetSection("LineNotifyConfig");
            _notifyUrl = lineConfig.GetValue<string>("notifyUrl");
            _tokenUrl = lineConfig.GetValue<string>("tokenUrl");
            _clientId = lineConfig.GetValue<string>("client_id");
            _clientSecret = lineConfig.GetValue<string>("client_secret");
            _redirectUri = lineConfig.GetValue<string>("redirect_uri");
            _successUri = lineConfig.GetValue<string>("successUri");
            _secret = lineConfig.GetValue<string>("secret");
            _line = new LineUtility(_notifyUrl, _tokenUrl, _redirectUri, _successUri);
            _line.OnInit(_clientId, _clientSecret);

        }

        public async Task SendMessage(MessageParams msg)
        {
            _line.SetToken(msg.Token);
            await _line.SendMessageAsync(msg.Message);
            _line.SetToken(_secret);
            await _line.SendMessageAsync(msg.Message);
        }

        public async Task<string> FetchToken(string code)
        {
          return  await _line.FetchTokenAsync("authorization_code", code);
        }
    }
}