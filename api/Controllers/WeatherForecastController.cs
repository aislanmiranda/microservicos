using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RabbitMQ.Client;
using RabbitMQ.Client.Events;

namespace api.Controllers
{
    [ApiController]
    [Route("api")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly IList<WeatherForecast> results = new List<WeatherForecast>()
        {
					new WeatherForecast { Title = "Titulo 1", Value = 100 },
					new WeatherForecast { Title = "Titulo 2", Value = 200 },
					new WeatherForecast { Title = "Titulo 3", Value = 300 },
					new WeatherForecast { Title = "Titulo 4", Value = 400 },
					new WeatherForecast { Title = "Aislan 5", Value = 500 },
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
					_logger = logger;
        }

        [HttpGet("values")]
        public IEnumerable<WeatherForecast> Get()
        {  
					return results;
        }

				[HttpGet("send")]
        public void SendMessage()
        {  
					var factory = new ConnectionFactory() { HostName = "rabbitmq", UserName="admin", Password="admin" };

					using(var connection = factory.CreateConnection())
					using(var channel = connection.CreateModel())
					{
							channel.QueueDeclare(queue: "rmqIn",
																	durable: false,
																	exclusive: false,
																	autoDelete: false,
																	arguments: null);

							string message = "Hello World!";
							var body = Encoding.UTF8.GetBytes(message);

							channel.BasicPublish(exchange: "",
																	routingKey: "rmqIn",
																	basicProperties: null,
																	body: body);

							Console.WriteLine("############### Send RMQ : {0}", message);
					}
        }

        [HttpGet("receive")]
				public void ReceiveMessage()
				{
					var factory = new ConnectionFactory() { HostName = "rabbitmq", UserName="admin", Password="admin" };

					using(var connection = factory.CreateConnection())
					using(var channel = connection.CreateModel())
					{
						channel.QueueDeclare(queue: "rmqIn",
																durable: false,
																exclusive: false,
																autoDelete: false,
																arguments: null);

						var consumer = new EventingBasicConsumer(channel);
						consumer.Received += (model, ea) =>
						{
              try
              {
                var body = ea.Body.ToArray();
                string message = Encoding.UTF8.GetString(body);
                Console.WriteLine("############### Received RMQ {0}", message);
                channel.BasicAck(ea.DeliveryTag, false);
                  
              }
              catch (System.Exception)
              {
                channel.BasicNack(ea.DeliveryTag, false, true);
              }
						};

						channel.BasicConsume(queue: "rmqIn",
																autoAck: false,
																consumer: consumer);
					}
				}
    }
}
